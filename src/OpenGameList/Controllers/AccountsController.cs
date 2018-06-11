using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenGameList.Data;
using Microsoft.AspNetCore.Identity;
using OpenGameList.Data.Users;
using OpenGameList.ViewModels;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenGameList.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : BaseController
    {
        #region Constructor
        public AccountsController(
            ApplicationDbContext context,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager
        ) : base(context, signInManager, userManager)
        {

        }
        #endregion

        #region External Authentication
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                SignInManager.SignOutAsync().Wait();
            }

            return Ok();
        }
        #endregion

        #region RESTful Conventions
        /// <summary>
        /// GET: api/accounts
        /// </summary>
        /// <returns>A Json-serialized object representing the current account.</returns>
        [HttpGet()]
        public IActionResult Get()
        {
            var id = GetCurrentUserId();

            var user = DbContext.Users.Where(i => i.Id == id).FirstOrDefault();

            if (user != null)
            {
                return new JsonResult(new UserViewModel()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    DisplayName = user.DisplayName
                }, DefaultJsonSettings);
            }
            else
            {
                return NotFound(new
                {
                    error = $"User ID {id} has not been found"
                });
            }
        }

        /// <summary>
        /// GET: api/accounts/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A Json-serialized object representing a single account.</returns>
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return BadRequest(new
            {
                error = "Not implemented (yet)."
            });
        }

        [HttpPost()]
        public async Task<IActionResult> Add([FromBody]UserViewModel uvm)
        {
            if (uvm != null)
            {
                try
                {
                    ApplicationUser user = await UserManager.FindByNameAsync(uvm.UserName);

                    if (user != null)
                    {
                        throw new Exception("UserName already exists.");
                    }

                    user = await UserManager.FindByEmailAsync(uvm.Email);

                    if (user != null)
                    {
                        throw new Exception("E-Mail already exists.");
                    }

                    var now = DateTime.Now;

                    // create a new item with the client-sent json data
                    user = new ApplicationUser
                    {
                        UserName = uvm.UserName,
                        Email = uvm.Email,
                        CreatedDate = now,
                        LastModifiedDate = now
                    };

                    await UserManager.CreateAsync(user, uvm.Password);

                    // Assign the user to the 'Registered' role.
                    await UserManager.AddToRoleAsync(user, "Registered");

                    // Remove lockout and Email confirmation
                    user.EmailConfirmed = true;
                    user.LockoutEnabled = false;

                    // Persists the newly-created User to the client
                    return new JsonResult(new UserViewModel()
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        DisplayName = user.DisplayName
                    }, DefaultJsonSettings);
                }
                catch (Exception e)
                {
                    return new JsonResult(new
                    {
                        error = e.Message
                    });
                }
            }

            return new StatusCodeResult(500);
        }

        /// <summary>
        /// PUT: api/accounts/{id}
        /// </summary>
        /// <param name="uvm"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody]UserViewModel uvm)
        {
            if (uvm != null)
            {
                try
                {
                    // retrieve user
                    var id = GetCurrentUserId();

                    ApplicationUser user = await UserManager.FindByIdAsync(id);

                    if (user == null)
                    {
                        throw new Exception("User not found!");
                    }

                    // check for current password
                    if (await UserManager.CheckPasswordAsync(user, uvm.Password))
                    {
                        // current password ok, perform changes (if any)
                        bool hadChanges = false;

                        if (user.Email != uvm.Email)
                        {
                            // check if the Email already exists
                            ApplicationUser user2 = await UserManager.FindByEmailAsync(uvm.Email);

                            if (user2 != null && user.Id != user2.Id)
                            {
                                throw new Exception("E-Mail already exists");
                            }
                            else
                            {
                                await UserManager.SetEmailAsync(user, uvm.Email);
                                hadChanges = true;
                            }
                        }

                        if (!string.IsNullOrEmpty(uvm.Password))
                        {
                            await UserManager.ChangePasswordAsync(user, uvm.Password, uvm.PasswordNew);
                            hadChanges = true;
                        }

                        if (user.DisplayName != uvm.DisplayName)
                        {
                            user.DisplayName = uvm.DisplayName;
                            hadChanges = true;
                        }

                        if (hadChanges)
                        {
                            // if we had at last 1 changes
                            user.LastModifiedDate = DateTime.Now;
                            DbContext.SaveChanges();
                        }

                        return new JsonResult(new UserViewModel
                        {
                            UserName = user.UserName,
                            Email = user.Email,
                            DisplayName = user.DisplayName
                        }, DefaultJsonSettings);
                    }
                    else
                    {
                        throw new Exception("Old password mismatch");
                    }
                }
                catch (Exception e)
                {
                    return new JsonResult(new
                    {
                        error = e.Message
                    });
                }
            }

            return NotFound(new
            {
                error = $"Current user has not been found"
            });
        }

        /// <summary>
        /// DELETE: api/accounts/
        /// </summary>
        /// <returns>Deletes current User, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete()]
        [Authorize]
        public IActionResult Delete()
        {
            return BadRequest(new
            {
                error = "Not implemented (yet)."
            });
        }

        /// <summary>
        /// DELETE: api/accounts/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes an User, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            return BadRequest(new
            {
                error ="Not implemented (yet)."
            });
        }
        #endregion RESTful Conventions
    }
}

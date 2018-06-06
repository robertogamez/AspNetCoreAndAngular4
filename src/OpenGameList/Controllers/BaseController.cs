using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenGameList.Data;
using Microsoft.AspNetCore.Identity;
using OpenGameList.Data.Users;
using System.Security.Claims;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenGameList.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : Controller
    {
        #region Common Fields
        protected ApplicationDbContext DbContext;
        protected SignInManager<ApplicationUser> SignInManager;
        protected UserManager<ApplicationUser> UserManager;
        #endregion

        #region Constructor
        public BaseController(
            ApplicationDbContext context,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager
        )
        {
            // Dependency Injection
            DbContext = context;
            SignInManager = signInManager;
            UserManager = userManager;
        }
        #endregion

        #region Common Methods
        /// <summary>
        /// Retrieves the .NET Core Identity User Id for the current ClaimsPrincipal
        /// </summary>
        /// <returns></returns>
        public string GetCurrentUserId()
        {
            // if the user is not authenticated, throw an exception
            if (!User.Identity.IsAuthenticated)
            {
                throw new NotSupportedException();
            }

            return User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        #endregion

        #region Common Properties
        protected JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }
        #endregion
    }
}

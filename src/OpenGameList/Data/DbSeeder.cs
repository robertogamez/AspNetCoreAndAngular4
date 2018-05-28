﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OpenGameList.Data.Comments;
using OpenGameList.Data.Items;
using OpenGameList.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenGameList.Data
{
    public class DbSeeder
    {
        #region Private members
        private ApplicationDbContext DbContext;
        private RoleManager<IdentityRole> RoleManager;
        private UserManager<ApplicationUser> UserManager;
        #endregion

        #region Constructor
        public DbSeeder(
            ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            DbContext = dbContext;
            RoleManager = roleManager;
            UserManager = userManager;
        }
        #endregion

        #region Public Methods
        public async Task SeedAsync()
        {
            // Create the Db if it doesn't exist
            DbContext.Database.EnsureCreated();
            // Create default Users
            if (await DbContext.Users.CountAsync() == 0) await CreateUsersAsync();
            // Create default Items (if there are none) and Comments
            if (await DbContext.Items.CountAsync() == 0) CreateItems();
        }
        #endregion Public Methods

        #region Seed Methods
        private async Task CreateUsersAsync()
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;
            string role_Administrators = "Administrators";
            string role_Registered = "Registered";

            // Ceate Roles if they doesn't exist yet
            if (!await RoleManager.RoleExistsAsync(role_Administrators))
            {
                await RoleManager.CreateAsync(new IdentityRole(role_Administrators));
            }

            if (!await RoleManager.RoleExistsAsync(role_Registered))
            {
                await RoleManager.CreateAsync(new IdentityRole(role_Registered));
            }

            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@opengamelist.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert "Admin" into the Database
            //DbContext.Users.Add(user_Admin);
            if (await UserManager.FindByIdAsync(user_Admin.Id) == null)
            {
                await UserManager.CreateAsync(user_Admin, "Pass4Admin");
                await UserManager.AddToRoleAsync(user_Admin, role_Administrators);
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

            var user_Ryan = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@opengamelist.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Solice = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@opengamelist.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Vodan = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@opengamelist.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert sample registered users into the Database
            //DbContext.Users.AddRange(user_Ryan, user_Solice, user_Vodan);
            // Insert sample registered users into the Database and also assign the "Registered" role to him.
            if (await UserManager.FindByIdAsync(user_Ryan.Id) == null)
            {
                await UserManager.CreateAsync(user_Ryan, "Pass4Ryan");
                await UserManager.AddToRoleAsync(user_Ryan, role_Registered);
                // Remove Lockout and E-Mail confirmation.
                user_Ryan.EmailConfirmed = true;
                user_Ryan.LockoutEnabled = false;
            }
            if (await UserManager.FindByIdAsync(user_Solice.Id) == null)
            {
                await UserManager.CreateAsync(user_Solice, "Pass4Solice");
                await UserManager.AddToRoleAsync(user_Solice, role_Registered);
                // Remove Lockout and E-Mail confirmation.
                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }
            if (await UserManager.FindByIdAsync(user_Vodan.Id) == null)
            {
                await UserManager.CreateAsync(user_Vodan, "Pass4Vodan");
                await UserManager.AddToRoleAsync(user_Vodan, role_Registered);
                // Remove Lockout and E-Mail confirmation.
                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }

            //DbContext.SaveChanges();
            await DbContext.SaveChangesAsync();
        }

        private void CreateItems()
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            var authorId = DbContext.Users.Where(u => u.UserName == "Admin")
                .FirstOrDefault().Id;

            var num = 1000; // create 1000 sample items
            for (int id = 1; id <= num; id++)
            {
                DbContext.Items.Add(GetSampleItem(id, authorId, num - id, new DateTime(2015, 12, 31).AddDays(-num)));
            }

            EntityEntry<Item> e1 = DbContext.Items.Add(new Item()
            {
                UserId = authorId,
                Title = "Magarena",
                Description = "Single-player fantasy card game similar to Magic: The Gathering",
                Text = @"Loosely based on Magic: The Gathering, the game lets you play against a computer opponent or another human being.
The game features a well-developed AI, an intuitive and clear interface and an enticing level of gameplay.",
                Notes = "This is a sample record created by the Code-First Configuration class",
                ViewCount = 2343,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Item> e2 = DbContext.Items.Add(new Item()
            {
                UserId = authorId,
                Title = "Minetest",
                Description = "Open-Source alternative to Minecraft",
                Text = @"The Minetest gameplay is very similar to Minecraft's: you are playing in a 3D open world, where you can create and/or remove
various types of blocks. Minetest feature both single-player and multiplayer
game modes. It also has support for custom mods, additional texture packs and other custom/personalization options.
Minetest has been released in 2015 under GNU Lesser General Public License.",
                Notes = "This is a sample record created by the Code-First Configuration class",
                ViewCount = 4180,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Item> e4 = DbContext.Items.Add(new Item()
            {
                UserId = authorId,
                Title = "SuperTux",
                Description = "A classic 2D jump and run, side-scrolling game similar to the Super Mario series.",
                Text = @"The game is currently under Milestone 3. The Milestone 2, which is currently out, features the following:
- a nearly completely rewritten game engine based on OpenGL, OpenAL, SDL2, ...
- support for translations - in-game manager for downloadable add-ons and translations
- Bonus Island III, a for now unfinished Forest Island and the development levels in Incubator Island
- a final boss in Icy Island - new and improved soundtracks and sound effects
... and much more! The game has been released under the GNU GPL license.",
                Notes = "This is a sample record created by the Code-First Configuration class",
                ViewCount = 9602,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            // Create default Comments (if there are none)
            if (DbContext.Comments.Count() == 0)
            {
                int numComments = 10; // comments per item
                for (int i = 1; i <= numComments; i++)
                    DbContext.Comments.Add(GetSampleComment(i, e1.Entity.Id, authorId,
                    createdDate.AddDays(i)));
                for (int i = 1; i <= numComments; i++)
                    DbContext.Comments.Add(GetSampleComment(i, e2.Entity.Id, authorId,
                    createdDate.AddDays(i)));
                for (int i = 1; i <= numComments; i++)
                    DbContext.Comments.Add(GetSampleComment(i, e4.Entity.Id, authorId,
                    createdDate.AddDays(i)));
            }

            DbContext.SaveChanges();

        }

        #endregion

        #region Utility Methods
        private Item GetSampleItem(int id, string authorId, int viewCount, DateTime createdDate)
        {
            return new Item()
            {
                UserId = authorId,
                Text = "Item " + id,
                Title = String.Format("Item {0} Title", id),
                Description = String.Format("This is a sample description for item {0}: Lorem ipsum dolor sit amet.", id),
                Notes = "This is a sample record created by the Code-First Configuration class",
                ViewCount = viewCount,
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };
        }

        private Comment GetSampleComment(int n, int itemId, string authorId, DateTime createdDate)
        {
            return new Comment()
            {
                ItemId = itemId,
                UserId = authorId,
                ParentId = null,
                Text = String.Format("Sample comment #{0} for the item #{1}",
            n, itemId),
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };
        }
        #endregion
    }
}

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OpenGameList.Data.Comments;
using OpenGameList.Data.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OpenGameList.Data.Users
{
    public class ApplicationUser : IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {

        }
        #endregion

        #region Properties
        [Key]
        //[Required]
        //public string Id { get; set; }

        //[Required]
        //[MaxLength(128)]
        //public string UserName { get; set; }

        //[Required]
        //public string Email { get; set; }

        public string DisplayName { get; set; }

        public string Notes { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public int Flags { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion

        #region Related Properties
        public virtual List<Item> Items { get; set; }

        public virtual List<Comment> Comments { get; set; }
        #endregion
    }
}

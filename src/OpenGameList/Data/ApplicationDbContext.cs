﻿using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OpenGameList.Data.Comments;
using OpenGameList.Data.Items;
using OpenGameList.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenGameList.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructor
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {

        }
        #endregion

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Items)
                .WithOne(i => i.Author);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.Author)
                .HasPrincipalKey(u => u.Id);

            modelBuilder.Entity<Item>().ToTable("Items");
            modelBuilder.Entity<Item>()
                .Property(i => i.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Author)
                .WithMany(u => u.Items);
            modelBuilder.Entity<Item>()
                .HasMany(i => i.Comments)
                .WithOne(c => c.Item);

            modelBuilder.Entity<Comment>().ToTable("Comments");
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Author)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Item)
                .WithMany(i => i.Comments);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Parent)
                .WithMany(c => c.Children);

            modelBuilder.Entity<Comment>()
                .HasMany(c => c.Children)
                .WithOne(c => c.Parent);
        }
        #endregion

        #region Properties
        public DbSet<Item> Items { get; set; }
        public DbSet<Comment> Comments { get; set; }
        //public DbSet<ApplicationUser> Users { get; set; }
        #endregion
    }
}

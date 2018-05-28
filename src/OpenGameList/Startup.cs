using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.EntityFrameworkCore.Infrastructure;
using OpenGameList.Data;
using Microsoft.EntityFrameworkCore;
using Nelibur.ObjectMapper;
using OpenGameList.ViewModels;
using OpenGameList.Data.Items;
using OpenGameList.Data.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace OpenGameList
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            // Add EntityFramework's Identity support.
            services.AddEntityFramework();

            // Add Identity Service & Stores
            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequireNonAlphanumeric = false;
                config.Cookies.ApplicationCookie.AutomaticChallenge = false;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //// Add AplicationDbContext
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
            });

            // Add AplicationDbContext's DbSeeder
            services.AddSingleton<DbSeeder>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app, 
            IHostingEnvironment env, 
            ILoggerFactory loggerFactory,
            DbSeeder dbSeeder)
        {
            app.Use(async (context, next) =>
            {
                await next();

                if(context.Response.StatusCode == 404 
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                // Routes sample A
                routes.MapRoute(
                    name: "RouteSampleA",
                    template: "MyOwnGet",
                    defaults: new
                    {
                        controller = "Items",
                        action = "Get"
                    }
                );

                // Route sample B
                routes.MapRoute(
                    name: "RouteSampleB",
                    template: "MyOwnPost",
                    defaults: new
                    {
                        controller = "Items",
                        action = "Post"
                    }
                );
            });

            // TinyMapper binding configuration
            TinyMapper.Bind<Item, ItemViewModel>();

            // Seed the Database (if needed)
            try
            {
                dbSeeder.SeedAsync().Wait();
            }
            catch (Exception e)
            {
                throw new Exception(e.ToString());
            }
        }
    }
}

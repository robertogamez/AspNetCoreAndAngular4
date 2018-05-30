using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using OpenGameList.Data.Users;
using Microsoft.AspNetCore.Identity;
using OpenGameList.Data;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;

namespace OpenGameList.Infrastructure
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JwtProvider
    {
        #region private members
        private readonly RequestDelegate _next;

        // JWT-related members
        private TimeSpan TokenExpiration;
        private SigningCredentials SigningCredentials;

        // EF and Identity members, available through DI
        private ApplicationDbContext DbContext;
        private UserManager<ApplicationUser> UserManager;
        private SignInManager<ApplicationUser> SignInManager;
        #endregion

        #region Static members
        private static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey
            = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "OpenGameListWebApp";
        public static string TokenEndpoint = "/api/connect/token";
        #endregion

        #region Constructor
        public JwtProvider(
            RequestDelegate next,
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signinManager)
        {
            _next = next;

            // Instantiate JWT-related members
            TokenExpiration = TimeSpan.FromMinutes(10);
            SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            // Instantiate through Dependency Injection
            DbContext = dbContext;
            UserManager = userManager;
            SignInManager = signinManager;
        }
        #endregion

        #region public methods
        public Task Invoke(HttpContext httpContext)
        {
            // Check if the request path matches out TokenEndPoint
            if (!httpContext.Request.Path.Equals(TokenEndpoint, StringComparison.Ordinal))
            {
                return _next(httpContext);
            }

            // Check if the current request is a valid POST with the appropriate content type (application/x-www-form-urlencoded)
            if (httpContext.Request.Method.Equals("POST")
                    && httpContext.Request.HasFormContentType)
            {
                //  Ok: generate token and send it via a json-formatted string 
                return CreateToken(httpContext);
            }
            else
            {
                // Not Ok: output a 400 - Bad Request Http error.
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }
        }
        #endregion

        #region Private methods
        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                // Retrieve the relevant FORM data
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];

                // check if there's an user with the given username
                var user = await UserManager.FindByNameAsync(username);
                // Fallback to support email address instead of username
                if(user == null && username.Contains("@"))
                {
                    user = await UserManager.FindByEmailAsync(username);
                }

                var success = user != null && await UserManager.CheckPasswordAsync(user, password);

                if (success)
                {
                    DateTime now = DateTime.Now;

                    // add the registered claims for JWT
                    // For more info, see https:tools.ietf.org/html/rfc7519#section-4.1
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                    };

                    // Create the JWT and write it to string
                    var token = new JwtSecurityToken(
                        claims: claims,
                        notBefore: now,
                        expires: now.Add(TokenExpiration),
                        signingCredentials: SigningCredentials
                    );

                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    // build the json response
                    var jwt = new
                    {
                        access_token = encodedToken,
                        expiration = (int)TokenExpiration.TotalSeconds
                    };

                    // Return the token
                    httpContext.Response.ContentType = "appication/json";
                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));
                    return;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsync("Invalid username or password");
        }
        #endregion
    }


    #region Extension Methods
    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtProviderExtensions
    {
        public static IApplicationBuilder UseJwtProvider(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtProvider>();
        }
    }
    #endregion
}

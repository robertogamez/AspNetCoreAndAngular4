using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenGameList.ViewModels;
using Newtonsoft.Json;
using OpenGameList.Data;
using Nelibur.ObjectMapper;
using OpenGameList.Data.Items;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenGameList.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        #region Private fields
        private ApplicationDbContext DbContext;
        #endregion

        #region Constructor
        public ItemsController(ApplicationDbContext context)
        {
            DbContext = context;
        }
        #endregion

        #region Attribute-based Routing
        /// <summary>
        /// GET: api/items/GetLatest
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(DefaultNumberOfItems);
        }

        /// <summary>
        /// api/items/GetLatest/{n}
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        [HttpGet("GetLatest/{n}")]
        public IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfItems)
            {
                n = MaxNumberOfItems;
            }

            var items = DbContext.Items.OrderByDescending(i => i.CreatedDate).Take(n).ToArray();

            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        /// <summary>
        /// api/items/GetMostViewed
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfItems);
        }

        // GET api/items/GetMostViewed/5
        [HttpGet("GetMostViewed/{n}")]
        public JsonResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfItems)
            {
                n = MaxNumberOfItems;
            }

            var items = DbContext.Items.OrderByDescending(i => i.ViewCount).Take(n).ToArray();

            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }
        /// <summary>
        /// GET: api/items/GetRandom
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(DefaultNumberOfItems);
        }

        /// <summary>
        /// GET: api/items/GetRandom/{n}
        /// </summary>
        /// <param name="n"></param>
        /// <returns></returns>
        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            if (n > MaxNumberOfItems)
            {
                n = MaxNumberOfItems;
            }

            var items = DbContext.Items.OrderBy(i => Guid.NewGuid()).Take(n).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }
        #endregion Attribute-based Routing

        #region RESTful Conventions
        /// <summary>
        /// GET: api/items
        /// </summary>
        /// <returns></returns>
        [HttpGet()]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }

        /// <summary>
        /// GET: api/items/id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();

            if (item != null)
            {
                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = string.Format("Item ID {0} has not been found", id) });
            }
        }

        /// <summary>
        /// POST: api/items
        /// </summary>
        /// <param name="ivm"></param>
        /// <returns></returns>
        [HttpPost()]
        public IActionResult Add([FromBody]ItemViewModel ivm)
        {
            if(ivm != null)
            {
                // Create a new Item with the client-sent json data
                var item = TinyMapper.Map<Item>(ivm);

                // Override any property that could be wise t oset from server-side only
                item.CreatedDate = item.LastModifiedDate = DateTime.Now;

                // Replace the following with the current user's id
                item.UserId = DbContext.Users.Where(u => u.UserName == "Admin").FirstOrDefault().Id;

                // Add the new Item
                DbContext.Items.Add(item);

                // Persist the changes into the database
                DbContext.SaveChanges();

                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
            }

            return new StatusCodeResult(500);
        }

        /// <summary>
        /// PUT: api/items/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ivm"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ItemViewModel ivm)
        {
            if(ivm != null)
            {
                var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();

                if(item != null)
                {
                    // Handle the update 
                    item.UserId = ivm.UserId;
                    item.Description = ivm.Description;
                    item.Flags = ivm.Flags;
                    item.Notes = ivm.Notes;
                    item.Text = ivm.Text;
                    item.Title = ivm.Title;
                    item.Type = ivm.Type;

                    // Override any property that could be wise to set from server-side only
                    item.LastModifiedDate = DateTime.Now;
                    // Persist the cnages into the datatabase
                    DbContext.SaveChanges();
                    // Return the updated Item to the client
                    return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
                }
            }

            // Return a HTTP Status 404 (Not Found)
            return NotFound(new { Error = string.Format("Item ID {0} has not been found", id) });
        }

        /// <summary>
        /// DELETE: api/items/{id}
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = DbContext.Items.Where(i => i.Id == id).FirstOrDefault();

            if(item != null)
            {
                // Remove the item to delete from the DbContext
                DbContext.Items.Remove(item);
                // Persist the changes into the Database
                DbContext.SaveChanges();
                // Return an HTTP Status 200 (OK)
                return new OkResult();
            }

            // Return a HTTP Status 404 (Not Found)
            return NotFound(new { Error = string.Format("Item ID {0} has not been found", id) });
        }
        #endregion

        #region Private members
        /// <summary>
        /// Maps a collection of Item entities into a list of ItemViewModel objects.
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        private List<ItemViewModel> ToItemViewModelList(IEnumerable<Item> items)
        {
            var lst = new List<ItemViewModel>();
            foreach (var i in items)
            {
                lst.Add(TinyMapper.Map<ItemViewModel>(i));
            }

            return lst;
        }

        /// <summary>
        /// Generate a sample array of source Items to emulate a database
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        private List<ItemViewModel> GetSampleItems(int num = 999)
        {
            List<ItemViewModel> lst = new List<ItemViewModel>();
            DateTime date = new DateTime(2015, 12, 31).AddDays(-num);

            for (int id = 1; id <= num; id++)
            {
                lst.Add(new ItemViewModel
                {
                    Id = id,
                    Title = string.Format("Item {0} Title", id),
                    Description = string.Format("This is a sample description for item {0}", id),
                    CreatedDate = date.AddDays(id),
                    ViewCount = num - id
                });
            }

            return lst;
        }

        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented
                };
            }
        }

        private int DefaultNumberOfItems
        {
            get
            {
                return 5;
            }
        }

        private int MaxNumberOfItems
        {
            get
            {
                return 100;
            }
        }
        #endregion
    }
}

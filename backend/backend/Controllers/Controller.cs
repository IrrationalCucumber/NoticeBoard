using backend.Views;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[action]")]
    [ApiController]
    public class Controller : ControllerBase
    {
        [HttpGet]
        public List<string> Sample()
        {
            List<string> list = new List<string> { "first", "second", "third", "fourth", "fifth", "sixth" };

            return list;
        }
        [HttpPost]
        public string SignUp(userModel model)
        {
            using (var context = new dbContext())
            {
                context.Users.Add(new user
                {
                    Username = model.Username,
                    Password = model.Password,
                    FName = model.FName,
                    LName = model.LName,
                    Email = model.Email,
                    Age = model.Age,
                    Bday = model.Bday,
                    Gender = model.Gender,
                });

                context.SaveChanges();
            }
            return "SUCCESS";
        }
        [HttpGet]
        public ActionResult<userModel> Profile(int userId)
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Id == userId);

                if (user != null)
                {
                    return Ok(user);
                }

                return NotFound();
            }
        }
        //for sign in
        //verify if user exist
        [HttpGet]
        public ActionResult<int> SignIn(string username, string password)
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Username == username && user.Password == password);

                if (user != null)
                {
                    return Ok(user.Id);
                }

                return NotFound();
            }
        }
        //get name
        [HttpGet]
        public ActionResult<string> GetName(int userID)
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Id == userID);

                if (user != null)
                {
                    return Ok(user.Username);
                }

                return NotFound();
            }
        }
        [HttpPost]
        public string Post(postModel model)
        {
            using (var context = new dbContext())
            {
                context.Posts.Add(new post
                {
                    Title = model.Title,
                    Description = model.Description,
                    Location = model.Location,
                    Long = model.Long,
                    Lat = model.Lat,
                    Date = model.Date,
                    PosterID = model.PosterID,

                });

                context.SaveChanges();
            }
            return "SUCCESS";
        }


    }
}
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
        public string Signup(userModel model)
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
        public ActionResult<string> SignIn(int userID)
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


    }
}
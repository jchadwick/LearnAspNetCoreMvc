using ExploreCalifornia.Models.Account;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExploreCalifornia.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Register()
        {
            return View(new RegisterViewModel());
        }

        [HttpPost]
        public IActionResult Register(RegisterViewModel registration)
        {
            if (!ModelState.IsValid)
                return View(registration);

            var newUser = new IdentityUser
            {
                Email = registration.EmailAddress,
                UserName = registration.EmailAddress,
            };

            // TODO:  Finish registering the user
        }
    }
}

	public IActionResult Index(int page = 0)
       {
           var pageSize = 2;
           var totalPosts = _db.Posts.Count();
           var totalPages = totalPosts / pageSize;
           var previousPage = page - 1;
           var nextPage = page + 1;

           ViewBag.PreviousPage = previousPage;
           ViewBag.HasPreviousPage = previousPage >= 0;
           ViewBag.NextPage = nextPage;
           ViewBag.HasNextPage = nextPage < totalPages;

           var posts = 
               _db.Posts
                   .OrderByDescending(x => x.Posted)
                   .Skip(pageSize * page)
                   .Take(pageSize)
                   .ToArray();

           return View(posts);
       }
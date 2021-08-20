using Microsoft.AspNetCore.Mvc;
using CodeChallenge.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;

namespace CodeChallenge.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExternalPostController : ControllerBase
    {
        private readonly IConfiguration _config;
        public ExternalPostController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
     
        public IEnumerable<Article> Get(string q, int max = 10,int page=1)
        {
            try
            {
                HttpClient http = new HttpClient();
                var url = _config.GetValue<string>("ExternalUrl");
                var id = _config.GetValue<string>("IdExternal");
                url = $"{url}?token={id}&q={q}&max={max}&page={page}";
                var blog = http.GetFromJsonAsync<Blog>(url).Result;
                return blog.Articles.ToArray();
            }
            catch
            {
                return null;
            }
          
        }
    }
}

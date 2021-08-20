using Newtonsoft.Json;
using System;
using System.Collections.Generic;


namespace CodeChallenge.Shared
{
    public class Blog
    {
        [JsonProperty("totalArticles")]
        public int TotalArticles { get; set; }

        [JsonProperty("articles")]
        public List<Article> Articles { get; set; }
    }

}

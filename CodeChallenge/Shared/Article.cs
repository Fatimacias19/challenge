using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace CodeChallenge.Shared
{  

    public class Article
    {
        [Key]
        [JsonProperty("id")]
        public string Id { get; set; }
        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("publishedAt")]
        public DateTime PublishedAt { get; set; }

        [JsonProperty("source")]
        public Source Source { get; set; }
    }
  
}

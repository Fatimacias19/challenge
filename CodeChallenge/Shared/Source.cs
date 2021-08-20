﻿using Newtonsoft.Json;
using System;

namespace CodeChallenge.Shared
{
    public class Source
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }
}

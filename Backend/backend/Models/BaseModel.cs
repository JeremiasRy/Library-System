﻿using System.Text.Json.Serialization;

namespace Backend.Models;

public abstract class BaseModel
{
    public int Id { get; set; }
    [JsonIgnore]
    public DateTime CreatedAt { get; set; }
    [JsonIgnore]
    public DateTime UpdatedAt { get; set;}
}

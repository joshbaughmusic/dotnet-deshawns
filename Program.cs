using Deshawns.Models;

List<Dog> dogs = new List<Dog>
{
    new Dog
    {
        Id = 1,
        Name = "Bertrand",
        WalkerId = 3,
        CityId = 2
    },
    new Dog
    {
        Id = 2,
        Name = "Bella",
        WalkerId = 7,
        CityId = 4
    },
    new Dog
    {
        Id = 3,
        Name = "Maximus",
        WalkerId = 2,
        CityId = 3
    },
    new Dog
    {
        Id = 4,
        Name = "Daisy",
        WalkerId = 5,
        CityId = 1
    },
    new Dog
    {
        Id = 5,
        Name = "Rusty",
        WalkerId = 8,
        CityId = 2
    },
    new Dog
    {
        Id = 6,
        Name = "Luna",
        WalkerId = 1,
        CityId = 5
    },
    new Dog
    {
        Id = 7,
        Name = "Charlie",
        WalkerId = 4,
        CityId = 4
    },
    new Dog
    {
        Id = 8,
        Name = "Rocky",
        WalkerId = 9,
        CityId = 1
    },
    new Dog
    {
        Id = 9,
        Name = "Maggie",
        WalkerId = 6,
        CityId = 3
    },
    new Dog
    {
        Id = 10,
        Name = "Oscar",
        WalkerId = 10,
        CityId = 5
    },
    new Dog
    {
        Id = 11,
        Name = "Ziggy",
        WalkerId = 2,
        CityId = 1
    },
    new Dog
    {
        Id = 12,
        Name = "Lucy",
        WalkerId = 3,
        CityId = 4
    },
    new Dog
    {
        Id = 13,
        Name = "Bentley",
        WalkerId = 7,
        CityId = 3
    },
    new Dog
    {
        Id = 14,
        Name = "Roxy",
        WalkerId = 1,
        CityId = 2
    },
    new Dog
    {
        Id = 15,
        Name = "Buddy",
        WalkerId = 5,
        CityId = 5
    },
    new Dog
    {
        Id = 16,
        Name = "Bailey",
        WalkerId = 8,
        CityId = 1
    },
    new Dog
    {
        Id = 17,
        Name = "Sophie",
        WalkerId = 4,
        CityId = 2
    },
    new Dog
    {
        Id = 18,
        Name = "Tucker",
        WalkerId = 9,
        CityId = 4
    },
    new Dog
    {
        Id = 19,
        Name = "Coco",
        WalkerId = 6,
        CityId = 1
    },
    new Dog
    {
        Id = 20,
        Name = "Riley",
        WalkerId = 10,
        CityId = 3
    }
};

List<Walker> walkers = new List<Walker>{
    new Walker
    {
        Id = 1,
        Name = "Bob"
    },
    new Walker
    {
        Id = 2,
        Name = "Emily"
    },
    new Walker
    {
        Id = 3,
        Name = "David"
    },
    new Walker
    {
        Id = 4,
        Name = "Sarah"
    },
    new Walker
    {
        Id = 5,
        Name = "Michael"
    },
    new Walker
    {
        Id = 6,
        Name = "Jessica"
    },
    new Walker
    {
        Id = 7,
        Name = "Daniel"
    },
    new Walker
    {
        Id = 8,
        Name = "Linda"
    },
    new Walker
    {
        Id = 9,
        Name = "William"
    },
    new Walker
    {
        Id = 10,
        Name = "Amanda"
    }
};

List<City> cities = new List<City>
{
    new City
    {
        Id = 1,
        Name = "New York"
    },
    new City
    {
        Id = 2,
        Name = "Los Angeles"
    },
    new City
    {
        Id = 3,
        Name = "Chicago"
    },
    new City
    {
        Id = 4,
        Name = "Houston"
    },
    new City
    {
        Id = 5,
        Name = "Miami"
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity
    {
        Id = 1,
        WalkerId = 3,
        CityId = 2
    },
    new WalkerCity
    {
        Id = 2,
        WalkerId = 5,
        CityId = 1
    },
    new WalkerCity
    {
        Id = 3,
        WalkerId = 7,
        CityId = 3
    },
    new WalkerCity
    {
        Id = 4,
        WalkerId = 2,
        CityId = 5
    },
    new WalkerCity
    {
        Id = 5,
        WalkerId = 1,
        CityId = 4
    },
    new WalkerCity
    {
        Id = 6,
        WalkerId = 4,
        CityId = 1
    },
    new WalkerCity
    {
        Id = 7,
        WalkerId = 6,
        CityId = 2
    },
    new WalkerCity
    {
        Id = 8,
        WalkerId = 9,
        CityId = 3
    },
    new WalkerCity
    {
        Id = 9,
        WalkerId = 8,
        CityId = 4
    },
    new WalkerCity
    {
        Id = 10,
        WalkerId = 10,
        CityId = 5
    },
    new WalkerCity
    {
        Id = 11,
        WalkerId = 3,
        CityId = 1
    },
    new WalkerCity
    {
        Id = 12,
        WalkerId = 5,
        CityId = 3
    },
    new WalkerCity
    {
        Id = 13,
        WalkerId = 7,
        CityId = 5
    },
    new WalkerCity
    {
        Id = 14,
        WalkerId = 2,
        CityId = 2
    },
    new WalkerCity
    {
        Id = 15,
        WalkerId = 1,
        CityId = 4
    }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


//dogs

app.MapGet("/api/dogs", () =>
{
    return dogs;
});

app.Run();

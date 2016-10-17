using System.Collections.Generic;

namespace ExploreCalifornia.Models
{
    public class Special
    {
        public string Key { get; internal set; }
        public string Name { get; internal set; }
        public string Type { get; internal set; }
        public int Price { get; internal set; }
    }

    public class SpecialsDataContext
    {
        public IEnumerable<Special> GetMonthlySpecials()
        {
            return new[]
            {
                new Special {
                    Key = "calm",
                    Name = "California Calm Package",
                    Type = "Day Spa Package",
                    Price = 250,
                },
                new Special {
                    Key = "desert",
                    Name = "From Desert to Sea",
                    Type = "2 Day Salton Sea",
                    Price = 350,
                },
                new Special {
                    Key = "backpack",
                    Name = "Backpack Cali",
                    Type = "Big Sur Retreat",
                    Price = 620,
                },
                new Special {
                    Key = "taste",
                    Name = "Taste of California",
                    Type = "Tapas & Groves",
                    Price = 150,
                },
            };
        }
    }
}

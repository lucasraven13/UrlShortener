using DAL.Models;
using System.Linq;

namespace UrlShortener.DAL.Utilities
{
    public static class TestDataUtility
    {
        public static void AddTestData()
        {
            using (var context = new DataContext())
            {
                context.Database.EnsureCreated();

                if (!context.UrlRecords.Any())
                {
                    var firstRecord = new UrlRecord
                    {
                        Id = 1,
                        Shortcut = "ggl",
                        Url = "https://www.google.com"
                    };

                    context.UrlRecords.Add(firstRecord);

                    var secondRecord = new UrlRecord
                    {
                        Id = 2,
                        Shortcut = "9g",
                        Url = "https://9gag.com/"
                    };

                    context.UrlRecords.Add(secondRecord);
                    context.SaveChanges();
                }
            }
        }
    }
}

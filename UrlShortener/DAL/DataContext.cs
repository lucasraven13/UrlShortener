using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace UrlShortener.DAL
{
    public class DataContext : DbContext
    {
        public DbSet<UrlRecord> UrlRecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=UrlShortener.db", options =>
            {
                options.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
            });


            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map table names
            modelBuilder.Entity<UrlRecord>().ToTable("UrlRecords", "urlshortener");
            modelBuilder.Entity<UrlRecord>(entity =>
            {
                 entity.HasIndex(e => e.Shortcut).IsUnique();
            });


            base.OnModelCreating(modelBuilder);
        }
    }
}

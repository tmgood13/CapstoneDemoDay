using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PRS_ServerV2.Models {

    public class PRSDbContext : DbContext {

        public PRSDbContext(DbContextOptions<PRSDbContext> context) : base(context) { }

        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<RequestLines> RequestLines { get; set; }
        public virtual DbSet<Requests> Requests { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Vendors> Vendors { get; set; }

         
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseLazyLoadingProxies();
                optionsBuilder.UseSqlServer("server=localhost\\sqlexpress;database=PRSdbCap;trusted_connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Products>(entity => {
                entity.HasIndex(e => e.PartNbr)
                .HasName("PartNbr")
                .IsUnique();                

                //entity.HasOne(d => d.Vendor)
                //.WithMany(p => p.Products)
                //.HasForeignKey(d => d.VendorId)
                //.HasConstraintName("FK_VendorId");
            });

            modelBuilder.Entity<RequestLines>(entity => {
                entity.Property(e => e.Quantity).HasDefaultValueSql("((1))");

                //entity.HasOne(d => d.Product)
                //.WithMany(p => p.RequestLines)
                //.HasForeignKey(d => d.ProductId)
                //.HasConstraintName("FK_ProductId");

                entity.HasOne(d => d.Request)
                .WithMany(p => p.RequestLines)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK_RequestId");
            });

            modelBuilder.Entity<Requests>(entity => {
                entity.Property(e => e.DeliveryMode).HasDefaultValueSql("('Pickup')");
                entity.Property(e => e.Status).HasDefaultValueSql("('NEW')");
                entity.Property(e => e.Total).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.User)
                .WithMany(p => p.Requests)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserId");
            });

            modelBuilder.Entity<Users>(entity => {
                entity.Property(e => e.IsReviewer).HasDefaultValueSql("((0))");
                entity.Property(e => e.IsAdmin).HasDefaultValueSql("((0))");

                entity.HasIndex(e => e.Username)
                .IsUnique();
            });

            modelBuilder.Entity<Vendors>(entity => {
                entity.HasIndex(e => e.Code)
                .IsUnique();
            });
        }
    }
}
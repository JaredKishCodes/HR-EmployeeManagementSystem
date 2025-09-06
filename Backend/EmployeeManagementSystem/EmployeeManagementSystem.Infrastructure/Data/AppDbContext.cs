

using EmployeeManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Employee)
                .WithMany()
                .HasForeignKey(lr => lr.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.ApprovedByEmployee)
                .WithMany()
                .HasForeignKey(lr => lr.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

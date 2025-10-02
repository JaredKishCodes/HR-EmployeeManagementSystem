

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
        public DbSet<LeaveRequest> LeaveRequests { get; set;}
        public DbSet<Attendance> Attendances { get; set; }

        public DbSet<Salary> Salaries { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            

        }
    }
}

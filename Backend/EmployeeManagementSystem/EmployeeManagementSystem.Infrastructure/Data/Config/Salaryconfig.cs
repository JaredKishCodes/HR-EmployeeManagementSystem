using EmployeeManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class SalaryConfig : IEntityTypeConfiguration<Salary>
{
    public void Configure(EntityTypeBuilder<Salary> builder)
    {
        builder.ToTable("Salaries");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).UseIdentityColumn();

        builder.Property(x => x.BasicSalary).IsRequired().HasColumnType("decimal(18,2)");
        builder.Property(x => x.Allowances).IsRequired().HasColumnType("decimal(18,2)");
        builder.Property(x => x.Deductions).IsRequired().HasColumnType("decimal(18,2)");

        builder.HasOne(x => x.Employee)
       .WithMany(e => e.Salaries)
       .HasForeignKey(x => x.EmployeeId)
       .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Department)
               .WithMany(d => d.Salaries)
               .HasForeignKey(x => x.DepartmentId)
               .OnDelete(DeleteBehavior.Restrict);

    }
}

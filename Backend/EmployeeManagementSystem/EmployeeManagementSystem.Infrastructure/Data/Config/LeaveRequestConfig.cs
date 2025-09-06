

using EmployeeManagementSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Data.Config
{
    public class LeaveRequestConfig : IEntityTypeConfiguration<LeaveRequest>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<LeaveRequest> builder)
        {
            builder.ToTable("LeaveRequests");
            builder.HasKey(lr => lr.Id);
            builder.Property(lr => lr.Id).UseIdentityColumn();
            builder.Property(lr => lr.EmployeeId).IsRequired();
            builder.Property(lr => lr.LeaveType).IsRequired();
            builder.Property(lr => lr.StartDate).IsRequired();
            builder.Property(lr => lr.EndDate).IsRequired();
            builder.Property(lr => lr.Reason).HasMaxLength(500);
            builder.Property(lr => lr.LeaveRequestStatus).IsRequired();

            builder.HasOne(lr => lr.Employee)
                .WithMany() // or .WithMany(e => e.LeaveRequests) if Employee has collection
                .HasForeignKey(lr => lr.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
    
    
}

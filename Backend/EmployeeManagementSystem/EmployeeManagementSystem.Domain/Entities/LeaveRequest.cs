

using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Domain.Entities
{
    public class LeaveRequest
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public LeaveRequestStatus LeaveRequestStatus { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? ApprovedBy { get; set; }

        public Employee? Employee { get; set; }
        public Employee? ApprovedByEmployee { get; set; }
    }
}

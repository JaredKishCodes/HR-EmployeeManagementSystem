using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.LeaveRequest
{
    public class CreateLeaveRequestDto
    {
        public int EmployeeId { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? ApprovedBy { get; set; }
    }
}

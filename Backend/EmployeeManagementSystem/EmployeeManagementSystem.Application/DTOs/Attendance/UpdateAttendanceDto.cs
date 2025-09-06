
using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Attendance
{
    public class UpdateAttendanceDto
    {
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }
        public AttendanceStatus AttendanceStatus { get; set; }
    }
}

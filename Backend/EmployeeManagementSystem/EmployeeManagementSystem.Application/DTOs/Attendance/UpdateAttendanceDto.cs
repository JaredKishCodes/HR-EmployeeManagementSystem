
using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Attendance
{
    public class UpdateAttendanceDto
    {
        public DateTimeOffset Date { get; set; }
        public DateTimeOffset TimeIn { get; set; }
        public DateTimeOffset? TimeOut { get; set; }
        public AttendanceStatus AttendanceStatus { get; set; }
    }
}

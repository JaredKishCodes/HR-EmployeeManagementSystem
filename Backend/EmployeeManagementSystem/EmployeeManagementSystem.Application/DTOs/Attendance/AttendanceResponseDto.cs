

using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Attendance
{
    public class AttendanceResponseDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string Date { get; set; }
        public string TimeIn { get; set; }
        public string? TimeOut { get; set; }
        public AttendanceStatus AttendanceStatus { get; set; }
        public decimal? TotalHours { get; set; }
    }
}

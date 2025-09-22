

using EmployeeManagementSystem.Domain.Enum;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EmployeeManagementSystem.Domain.Entities
{
    public class Attendance
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTimeOffset Date { get; set; }
        public DateTimeOffset TimeIn { get; set; }
        public DateTimeOffset? TimeOut { get; set; }
        public AttendanceStatus AttendanceStatus { get; set; }
        public decimal TotalHours { get; set; }
        public Employee? Employee { get; set; }

    }
}

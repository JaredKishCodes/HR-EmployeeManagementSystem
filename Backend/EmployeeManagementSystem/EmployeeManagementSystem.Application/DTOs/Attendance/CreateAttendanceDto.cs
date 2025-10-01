

using EmployeeManagementSystem.Application.Helper;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Attendance
{
    public class CreateAttendanceDto
    {
        public int EmployeeId { get; set; }
        public DateTimeOffset TimeIn { get; set; }


    }
}

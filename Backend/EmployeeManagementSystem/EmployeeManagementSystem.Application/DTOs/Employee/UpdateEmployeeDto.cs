

using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Employee
{
    public class UpdateEmployeeDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Position Position { get; set; } 
        public DateTime HireDate { get; set; }
        public Status Status { get; set; } 
        public int DepartmentId { get; set; }
    }

}

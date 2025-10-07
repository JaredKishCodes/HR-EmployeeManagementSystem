

using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Application.DTOs.Employee
{
    public class EmployeeResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Position Position { get; set; }
        public DateTime HireDate { get; set; }
        public Status Status { get; set; } 
        public string? DepartmentName { get; set; }
        public decimal Salary { get; set; }
    }
}



using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Application.DTOs.Employee
{
    public class EmployeeResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? DepartmentName { get; set; }
    }
}

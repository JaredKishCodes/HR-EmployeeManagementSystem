

using EmployeeManagementSystem.Domain.Enum;

namespace EmployeeManagementSystem.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }  = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Position Position { get; set; }
        public DateTime HireDate { get; set; }
        public Status Status { get; set; }

        public int DepartmentId { get; set; }
        public Department? Department { get; set; }

        public ICollection<Salary> Salaries { get; set; } = new List<Salary>();

    }
}

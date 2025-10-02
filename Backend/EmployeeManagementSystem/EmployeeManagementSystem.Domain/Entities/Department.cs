

namespace EmployeeManagementSystem.Domain.Entities
{
    public class Department
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public ICollection<Salary> Salaries { get; set; } = new List<Salary>();
    }
}


namespace EmployeeManagementSystem.Application.DTOs.Salary
{
    internal class SalaryResponse
    {
        public int Id { get; set; }
        public int DepartmentName { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal Allowance { get; set; }
        public decimal Deductions { get; set; }
        public string? Date { get; set; }
    }
}

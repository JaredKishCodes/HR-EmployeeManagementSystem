
namespace EmployeeManagementSystem.Application.DTOs.Salary
{
    public class SalaryResponse
    {
        public int Id { get; set; }
        public string? EmployeeName { get; set; }
        public string? DepartmentName { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal Allowance { get; set; }
        public decimal Deductions { get; set; }

        public decimal TotalSalary { get; set; }
        public DateTime PayDate { get; set; }
    }
}



namespace EmployeeManagementSystem.Application.DTOs.Salary
{
    public class AddSalaryDto
    {
        public int EmployeeName { get; set; }
        public int DepartmentName { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal Allowance { get; set;}
        public decimal Deductions { get; set; }
        public string Date { get; set; }
    }
}

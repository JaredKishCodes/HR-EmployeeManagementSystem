

namespace EmployeeManagementSystem.Application.DTOs.Salary
{
    public class AddSalaryDto
    {
        public int EmployeeId { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal Allowance { get; set;}
        public decimal Deductions { get; set; }
        public DateTime? PayDate { get; set; }
    }
}

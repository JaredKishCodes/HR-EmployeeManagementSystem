

namespace EmployeeManagementSystem.Domain.Entities
{
    public class Salary
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public decimal BasicSalary { get; set; }
        public decimal Allowances { get; set; }
        public decimal Deductions { get; set; }
        public DateTime PayDate { get; set; }
        public Employee? Employee { get; set; }
    }   
}



using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain.Interfaces
{
    public interface ISalaryRepository
    {
        Task<Salary> AddSalaryAsync(Salary salary);
        Task<Salary?> GetSalaryByIdAsync(int id);
        Task<Salary?> GetLatestSalaryByEmployeeIdAsync(int employeeId);
        Task<IEnumerable<Salary>>GetAllSalariesAsync();
        Task<Salary> UpdateSalaryAsync(Salary salary);
        Task<bool> DeleteSalaryAsync(int id);
    }
}

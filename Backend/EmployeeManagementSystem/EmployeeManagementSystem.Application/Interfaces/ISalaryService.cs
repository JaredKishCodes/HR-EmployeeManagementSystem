using EmployeeManagementSystem.Application.DTOs.Salary;

namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface ISalaryService
    {
        Task<SalaryResponse> AddSalaryAsync(AddSalaryDto addSalaryDto);
        Task<SalaryResponse?> GetSalaryByIdAsync(int id);
        Task<IEnumerable<SalaryResponse>> GetAllSalariesAsync();
        Task<SalaryResponse?> UpdateSalaryAsync(int id, UpdateSalaryDto updateSalaryDto);
        Task<bool> DeleteSalaryAsync(int id);
    }
}

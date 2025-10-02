

using EmployeeManagementSystem.Application.DTOs.Salary;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class SalaryService(ISalaryRepository salaryRepository) : ISalaryService
    {
        public Task<bool> DeleteSalaryAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<SalaryResponse> ISalaryService.AddSalaryAsync(AddSalaryDto addSalaryDto)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<SalaryResponse>> ISalaryService.GetAllSalariesAsync()
        {
            throw new NotImplementedException();
        }

        Task<SalaryResponse?> ISalaryService.GetSalaryByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<SalaryResponse?> ISalaryService.UpdateSalaryAsync(int id, UpdateSalaryDto updateSalaryDto)
        {
            throw new NotImplementedException();
        }
    }
}

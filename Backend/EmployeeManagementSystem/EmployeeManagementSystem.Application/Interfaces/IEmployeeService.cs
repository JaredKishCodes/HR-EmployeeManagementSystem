

using EmployeeManagementSystem.Application.DTOs.Employee;

namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeesAsync();
        Task<EmployeeResponseDto> GetEmployeeByIdAsync(int id);
        Task<EmployeeResponseDto> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto);
        Task<EmployeeResponseDto> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}

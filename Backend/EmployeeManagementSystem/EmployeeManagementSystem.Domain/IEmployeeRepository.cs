
using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee?> CreateEmployeeAsync(Employee employee);
        Task<Employee?> UpdateEmployeeAsync(Employee employee);

        Task<bool> DeleteEmployeeAsync(int id);
    }
}

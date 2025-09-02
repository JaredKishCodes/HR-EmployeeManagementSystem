
using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee?> CreateEmployee(Employee employee);
        Task<Employee?> UpdateEmployee(Employee employee);

        Task<bool?> DeleteEmployee(int id);
    }
}

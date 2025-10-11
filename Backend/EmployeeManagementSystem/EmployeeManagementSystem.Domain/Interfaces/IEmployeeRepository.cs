using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);

        Task<Employee?> GetEmployeeByUserIdAsync(string userId);
        Task<Employee?> GetEmployeeWithDepartmentAsync(int employeeId);
        Task<IEnumerable<Employee?>> GetEmployeesByDepartment(int departmentId);
        Task<Employee?> CreateEmployeeAsync(Employee employee);
        Task<Employee?> UpdateEmployeeAsync(Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}

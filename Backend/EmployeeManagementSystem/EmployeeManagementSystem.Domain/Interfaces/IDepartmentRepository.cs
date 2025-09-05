

using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
        Task<Department?> GetDepartmentByIdAsync(int id);
        Task<Department?> CreateDepartmentAsync(Department department);
        Task<Department> UpdateDepartmentAsync(Department department);

        Task<bool> DeleteDepartmentAsync(int id);
    }
}

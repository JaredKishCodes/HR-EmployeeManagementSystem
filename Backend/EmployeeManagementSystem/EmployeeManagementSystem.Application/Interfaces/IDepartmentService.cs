using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementSystem.Application.DTOs.Department;
using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface IDepartmentService
    {
        Task<IEnumerable<DepartmentResponse>> GetAllDepartmentsAsync();
        Task<DepartmentResponse?> GetDepartmentByIdAsync(int id);
        Task<DepartmentResponse> CreateDepartmentAsync(CreateDepartment createDepartment);
        Task<DepartmentResponse> UpdateDepartmentAsync(int id,CreateDepartment updateDepartment);
        Task<bool> DeleteDepartmentAsync(int id);
    }
}

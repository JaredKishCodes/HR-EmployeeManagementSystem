using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagementSystem.Application.DTOs.Department;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task<DepartmentResponse> CreateDepartmentAsync(CreateDepartment createDepartment)
        {
            var department = new Department
            {
                Name = createDepartment.Name,
                Description = createDepartment.Description,
            };

            var newDepartment = await _departmentRepository.CreateDepartmentAsync(department);

            if (newDepartment == null)
                throw new Exception("Failed to create department");

            return new DepartmentResponse
            {
                Id = newDepartment.Id,
                Name = newDepartment.Name,
                Description = newDepartment.Description,
            };
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            var department = await _departmentRepository.GetDepartmentByIdAsync(id);
            if (department == null)
                return false;

            return await _departmentRepository.DeleteDepartmentAsync(id);
        }

        public async Task<IEnumerable<DepartmentResponse>> GetAllDepartmentsAsync()
        {
            var departments = await _departmentRepository.GetAllDepartmentsAsync();

            return departments.Select(d => new DepartmentResponse
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description
            });
        }

        public async Task<DepartmentResponse?> GetDepartmentByIdAsync(int id)
        {
            var department = await _departmentRepository.GetDepartmentByIdAsync(id);
            if (department == null)
                return null;

            return new DepartmentResponse
            {
                Id = department.Id,
                Name = department.Name,
                Description = department.Description
            };
        }

        public async Task<DepartmentResponse> UpdateDepartmentAsync(int id, CreateDepartment updateDepartment)
        {     
            var existingDepartment = await _departmentRepository.GetDepartmentByIdAsync(id);
            if (existingDepartment == null)
                throw new Exception("Department not found");

            existingDepartment.Name = updateDepartment.Name;
            existingDepartment.Description = updateDepartment.Description;

            var updatedDepartment = await _departmentRepository.UpdateDepartmentAsync(existingDepartment);

            return new DepartmentResponse
            {
                Id = updatedDepartment.Id,
                Name = updatedDepartment.Name,
                Description = updatedDepartment.Description
            };
        }
    }
}

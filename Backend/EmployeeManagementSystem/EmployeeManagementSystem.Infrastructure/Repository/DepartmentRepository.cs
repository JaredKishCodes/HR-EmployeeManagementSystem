

using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {   
        private readonly AppDbContext _context;
        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Department?> CreateDepartmentAsync(Department department)
        {
            _context.Add(department);
            await _context.SaveChangesAsync();

            return department;
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);

            _context.Remove(department);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
           return await _context.Departments.ToListAsync();
        }

        public async Task<Department?> GetDepartmentByIdAsync(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            return department;
        }

        public async Task<Department> UpdateDepartmentAsync(Department department)
        {
            var existingDepartment = _context.Departments.Find(department.Id);
            if (existingDepartment != null)
            {
                existingDepartment.Name = department.Name;
                existingDepartment.Description = department.Description;
               

                _context.Departments.Update(existingDepartment);
                await _context.SaveChangesAsync();

                return existingDepartment;

            }

            return department;
        }
    }
}

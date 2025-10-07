using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class EmployeeRepository(AppDbContext _context) : IEmployeeRepository
    {
        public async Task<Employee?> CreateEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee); 
           await _context.SaveChangesAsync();

            return employee;
           
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
           var employee= await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee != null) 
            { 
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
           return await _context.Employees.Include(d => d.Department).ThenInclude(s => s.Salaries).ToListAsync();
        }

        public async Task<IEnumerable<Employee?>> GetEmployeesByDepartment(int departmentId)
        {
            return await _context.Employees.Where(e => e.DepartmentId == departmentId).ToListAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
          return  await _context.Employees.Include(d => d.Department).ThenInclude(x => x.Salaries).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Employee?> GetEmployeeWithDepartmentAsync(int employeeId)
        {
            return await _context.Employees.Include(x => x.Department).FirstOrDefaultAsync(e => e.Id == employeeId);
        }

        public async Task<Employee?> UpdateEmployeeAsync(Employee employee)
        {
            var existingEmployee = _context.Employees.Find(employee.Id);
            if (existingEmployee != null)
            { 
                existingEmployee.Department = employee.Department;
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Email = employee.Email;
                existingEmployee.PhoneNumber = employee.PhoneNumber;
                existingEmployee.Position = employee.Position;
                existingEmployee.HireDate = employee.HireDate;
                existingEmployee.Status = employee.Status;

                _context.Employees.Update(existingEmployee);
                await _context.SaveChangesAsync();

                return existingEmployee;

            }

            return employee;

        }
    }
}



using EmployeeManagementSystem.Domain;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Infrastructure.Data;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class EmployeeRepository(AppDbContext _context) : IEmployeeRepository
    {
        public Task<Employee?> CreateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public Task<bool?> DeleteEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Employee?> UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}

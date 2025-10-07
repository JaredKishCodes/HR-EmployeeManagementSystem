

using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class SalaryRepository : ISalaryRepository
    {   
        private readonly AppDbContext _context;
        public SalaryRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Salary> AddSalaryAsync(Salary salary)
        {
            var result =  _context.Salaries.Add(salary);
                       await _context.SaveChangesAsync();

            return salary;
        }

        public async Task<bool> DeleteSalaryAsync(int id)
        {
            var salary = await _context.Salaries.FindAsync(id);
            if (salary == null) {
                return false;
            }

            _context.Salaries.Remove(salary);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<IEnumerable<Salary>> GetAllSalariesAsync()
        {
            return await _context.Salaries.AsNoTracking().Include(x => x.Employee).ThenInclude(x => x.Department).ToListAsync();
        }

        public async Task<Salary?> GetLatestSalaryByEmployeeIdAsync(int employeeId)
        {
            return await _context.Salaries.Where(x => x.EmployeeId == employeeId).OrderByDescending(s => s.PayDate).FirstOrDefaultAsync();
        }

        public async Task<Salary?> GetSalaryByIdAsync(int id)
        {
            var result = await _context.Salaries.Include(x => x.Employee).ThenInclude(x => x.Department).FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }

        public async Task<Salary> UpdateSalaryAsync(Salary salary)
        {
            var existingSalary = await _context.Salaries.FindAsync(salary.Id);

            if (existingSalary != null)
            {
                existingSalary.BasicSalary = salary.BasicSalary;
                existingSalary.Allowances = salary.Allowances;
                existingSalary.Deductions = salary.Deductions;
                existingSalary.EmployeeId = salary.EmployeeId;
             
                _context.Salaries.Update(existingSalary);
                await _context.SaveChangesAsync();
                return existingSalary;
            }

            return null;
        }   
    }
}

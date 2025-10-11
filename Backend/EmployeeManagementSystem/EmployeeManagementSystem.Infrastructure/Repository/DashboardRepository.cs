

using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class DashboardRepository(AppDbContext _context) : IDashboardRepository
    {
        public async Task<int> GetDepartmentsCountAsync()
        {
           return await _context.Departments.CountAsync();
        }

        public async Task<int> GetEmployeesCountAsync()
        {
            return await _context.Employees.CountAsync();
        }

        public async Task<int> GetLeavesCountAsync()
        {
            return await _context.LeaveRequests.CountAsync();
        }

        public async Task<decimal> GetPayrollCountAsync()
        {
            return await _context.Salaries.Select(x => x.TotalSalary).SumAsync();
        }

        public async Task<int> GetPendingLeavesCountAsync()
        {
            return await _context.LeaveRequests
                .CountAsync(x => x.LeaveRequestStatus == Domain.Enum.LeaveRequestStatus.Pending);
        }
    }
}

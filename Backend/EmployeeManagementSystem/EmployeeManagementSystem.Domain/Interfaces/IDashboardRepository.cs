
using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain.Interfaces
{
    public interface IDashboardRepository
    {
        Task<int> GetEmployeesCountAsync();
        Task<int> GetDepartmentsCountAsync();
        Task<decimal> GetPayrollCountAsync();
        Task<int> GetPendingLeavesCountAsync();
        Task<int> GetLeavesCountAsync();

    }
}

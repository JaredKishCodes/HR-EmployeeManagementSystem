

using EmployeeManagementSystem.Domain.Entities;

namespace EmployeeManagementSystem.Domain.Interfaces
{
    public interface ILeaveRequestRepository
    {
        Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync();
        Task<LeaveRequest> GetLeaveRequestByIdAsync(int id);
        Task<LeaveRequest> UpdateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<bool> DeleteLeaveRequestByIdAsync(int id);
    }

}   

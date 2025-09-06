
using EmployeeManagementSystem.Application.DTOs.LeaveRequest;

namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface ILeaveRequestService
    {
        Task<LeaveRequestResponseDto> CreateLeaveRequestAsync(CreateLeaveRequestDto createLeaveRequestDto);
        Task<IEnumerable<LeaveRequestResponseDto>> GetAllLeaveRequestsAsync();
        Task<LeaveRequestResponseDto> GetLeaveRequestByIdAsync(int id);
        Task<LeaveRequestResponseDto> UpdateLeaveRequestAsync(int id, UpdateLeaveRequestDto updateLeaveRequestDto);
        Task<bool> DeleteLeaveRequestByIdAsync(int id);
    }
}

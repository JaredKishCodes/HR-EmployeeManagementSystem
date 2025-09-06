
using EmployeeManagementSystem.Application.DTOs.LeaveRequest;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Enum;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class LeaveRequestService(ILeaveRequestRepository _leaveRequestRepository) : ILeaveRequestService
    {
        public async Task<LeaveRequestResponseDto> CreateLeaveRequestAsync(CreateLeaveRequestDto createLeaveRequestDto)
        {
            var leaveReq = new LeaveRequest
            {
                EmployeeId = createLeaveRequestDto.EmployeeId,
                LeaveType = createLeaveRequestDto.LeaveType,
                StartDate = createLeaveRequestDto.StartDate,
                EndDate = createLeaveRequestDto.EndDate,
                Reason = createLeaveRequestDto.Reason,
                CreatedAt = createLeaveRequestDto.CreatedAt,

                LeaveRequestStatus = LeaveRequestStatus.Pending,
                ApprovedBy = null

            };

            var newLeaveReq = await _leaveRequestRepository.CreateLeaveRequestAsync(leaveReq);

            return new LeaveRequestResponseDto
            {
                EmployeeId = leaveReq.EmployeeId,
                LeaveType = leaveReq.LeaveType,
                StartDate = leaveReq.StartDate,
                EndDate = leaveReq.EndDate,
                Reason = leaveReq.Reason,
                LeaveRequestStatus = leaveReq.LeaveRequestStatus,
                CreatedAt = leaveReq.CreatedAt,
                ApprovedBy = leaveReq.ApprovedBy,
            };
        }

        public Task<bool> DeleteLeaveRequestByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LeaveRequestResponseDto>> GetAllLeaveRequestsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<LeaveRequestResponseDto> GetLeaveRequestByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<LeaveRequestResponseDto> UpdateLeaveRequestAsync(int id, UpdateLeaveRequestDto updateLeaveRequestDto)
        {
            throw new NotImplementedException();
        }
    }
}

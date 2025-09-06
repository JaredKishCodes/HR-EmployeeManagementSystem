
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
                

            };

            var newLeaveReq = await _leaveRequestRepository.CreateLeaveRequestAsync(leaveReq);

            return new LeaveRequestResponseDto
            {
                Id = newLeaveReq.Id,
                EmployeeId = leaveReq.EmployeeId,
                LeaveType = leaveReq.LeaveType,
                StartDate = leaveReq.StartDate,
                EndDate = leaveReq.EndDate,
                Reason = leaveReq.Reason,
                LeaveRequestStatus = leaveReq.LeaveRequestStatus,
                CreatedAt = leaveReq.CreatedAt,
                ApprovedBy = ApprovedBy.Pending,
            };
        }

        public async Task<bool> DeleteLeaveRequestByIdAsync(int id)
        {
            var leaveReq = await _leaveRequestRepository.GetLeaveRequestByIdAsync(id);
            if(leaveReq != null)
            {
              await _leaveRequestRepository.DeleteLeaveRequestByIdAsync(id);

                return true;
            }
                return false;
            
        }

        public async Task<IEnumerable<LeaveRequestResponseDto>> GetAllLeaveRequestsAsync()
        {
           var leaveReq = await _leaveRequestRepository.GetAllLeaveRequestsAsync();

            return leaveReq.Select(x => new LeaveRequestResponseDto
            {   
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                LeaveType = x.LeaveType,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Reason = x.Reason,
                LeaveRequestStatus = x.LeaveRequestStatus,
                ApprovedBy = x.ApprovedBy,
                CreatedAt = x.CreatedAt,

            });
        }

        public async Task<LeaveRequestResponseDto> GetLeaveRequestByIdAsync(int id)
        {
            var leaveReq = await _leaveRequestRepository.GetLeaveRequestByIdAsync(id);

            if (leaveReq == null) return null;

            return new LeaveRequestResponseDto
            {   
                Id = id,
                EmployeeId = leaveReq.EmployeeId,
                LeaveType = leaveReq.LeaveType,
                StartDate = leaveReq.StartDate,
                EndDate = leaveReq.EndDate,
                Reason = leaveReq.Reason,
                LeaveRequestStatus = leaveReq.LeaveRequestStatus,
                ApprovedBy = leaveReq.ApprovedBy,
                CreatedAt = leaveReq.CreatedAt,

            };
        }

        public async Task<LeaveRequestResponseDto> UpdateLeaveRequestAsync(int id, UpdateLeaveRequestDto updateLeaveRequestDto)
        {
            var existingLeaveReq = await _leaveRequestRepository.GetLeaveRequestByIdAsync(id);
            if (existingLeaveReq == null)
                throw new Exception("Leave request not found");

            existingLeaveReq.LeaveType = updateLeaveRequestDto.LeaveType;
            existingLeaveReq.StartDate = updateLeaveRequestDto.StartDate;
            existingLeaveReq.EndDate = updateLeaveRequestDto.EndDate;
            existingLeaveReq.Reason = updateLeaveRequestDto.Reason;
            existingLeaveReq.LeaveRequestStatus = updateLeaveRequestDto.LeaveRequestStatus;
            existingLeaveReq.ApprovedBy = updateLeaveRequestDto.ApprovedBy;
            
            var updatedLeaveReq = await _leaveRequestRepository.UpdateLeaveRequestAsync(existingLeaveReq);

            return new LeaveRequestResponseDto
            {
                Id = id,
                EmployeeId = updatedLeaveReq.EmployeeId,
                LeaveType = updatedLeaveReq.LeaveType,
                StartDate = updatedLeaveReq.StartDate,
                EndDate = updatedLeaveReq.EndDate,
                Reason = updatedLeaveReq.Reason,
                LeaveRequestStatus = updatedLeaveReq.LeaveRequestStatus,
                ApprovedBy = updatedLeaveReq.ApprovedBy,
                CreatedAt = updatedLeaveReq.CreatedAt,
            };

        }
    }
}



using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Enum;
using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class LeaveRequestRepository(AppDbContext _context) : ILeaveRequestRepository
    {
        public async Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
          await  _context.LeaveRequests.AddAsync(leaveRequest);
            await _context.SaveChangesAsync();
            return leaveRequest;
        }

        public async Task<bool> DeleteLeaveRequestByIdAsync(int id)
        {
            var leaveReq = await _context.LeaveRequests.FirstOrDefaultAsync(x => x.Id == id);
            if (leaveReq != null) 
            {
                _context.LeaveRequests.Remove(leaveReq);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync()
        {
            return await _context.LeaveRequests.AsNoTracking().Include(e => e.Employee).ToListAsync();
        }

        public async Task<LeaveRequest> GetLeaveRequestByIdAsync(int id)
        {
            return await _context.LeaveRequests.Include(e => e.Employee).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByEmployeeId(int employeeId)
        {
           var employee =  await _context.Employees.FirstOrDefaultAsync(x => x.Id == employeeId);
            if (employee is not null)
            {
                return await _context.LeaveRequests.Where(x => x.EmployeeId == employeeId).ToListAsync();
            }

            return Enumerable.Empty<LeaveRequest>();
        }

        public async Task<LeaveRequest> UpdateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            var existingLeaveReq = await _context.LeaveRequests.FindAsync(leaveRequest.Id);
            if(existingLeaveReq != null)
            {
                existingLeaveReq.LeaveType = leaveRequest.LeaveType;
                existingLeaveReq.StartDate = leaveRequest.StartDate;
                existingLeaveReq.EndDate = leaveRequest.EndDate;
                existingLeaveReq.Reason = leaveRequest.Reason;
                existingLeaveReq.LeaveRequestStatus = leaveRequest.LeaveRequestStatus;
                existingLeaveReq.ApprovedBy = leaveRequest.ApprovedBy;

                _context.LeaveRequests.Update(existingLeaveReq);
                await _context.SaveChangesAsync();

                return existingLeaveReq;

            }

            return null;



        }
    }
}

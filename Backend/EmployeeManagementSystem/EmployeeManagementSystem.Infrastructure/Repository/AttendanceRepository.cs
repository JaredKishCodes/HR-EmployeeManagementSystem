

using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class AttendanceRepository : IAttendanceRepository
    {
        public Task<Attendance> CreateAttendanceAsync(Attendance attendance)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAttendanceAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Attendance>> GetAllAttendancesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Attendance> GetAttendanceByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Attendance> UpdateAttendanceAsync(Attendance attendance)
        {
            throw new NotImplementedException();
        }
    }
}



using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using EmployeeManagementSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Repository
{
    public class AttendanceRepository(AppDbContext _context ) : IAttendanceRepository
    {
        public async Task<Attendance> CreateAttendanceAsync(Attendance attendance)
        {
           await _context.Attendances.AddAsync(attendance);
            await _context.SaveChangesAsync();

            await _context.Entry(attendance)
                  .Reference(a => a.Employee)
                  .LoadAsync();

            return attendance;
        }

        public async Task<bool> DeleteAttendanceAsync(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance != null)
            {
                 _context.Attendances.Remove(attendance);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<Attendance>> GetAllAttendancesAsync()
        {
            return await _context.Attendances.AsNoTracking().Include(x => x.Employee).ToListAsync();
        }

        public async Task<Attendance> GetAttendanceByIdAsync(int id)
        {
            return await _context.Attendances.Include(x => x.Employee).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Attendance> UpdateAttendanceAsync(Attendance attendance)
        {
            var existingAttendance = await _context.Attendances.FirstOrDefaultAsync(x => x.Id == attendance.Id);
            if (existingAttendance != null) 
            {
                existingAttendance.EmployeeId = attendance.EmployeeId;
                existingAttendance.Date = attendance.Date;
                existingAttendance.TimeIn = attendance.TimeIn;
                existingAttendance.TimeOut = attendance.TimeOut;

                if (attendance.TimeOut.HasValue)
                {
                    existingAttendance.TotalHours = (decimal)(attendance.TimeIn - attendance.TimeOut.Value).TotalHours;
                }

                _context.Attendances.Update(existingAttendance);
                await _context.SaveChangesAsync();

                return existingAttendance;
            }

            return attendance;
        }
    }
}

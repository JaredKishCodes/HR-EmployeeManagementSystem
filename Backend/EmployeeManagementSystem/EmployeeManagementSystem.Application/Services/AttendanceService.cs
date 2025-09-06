

using EmployeeManagementSystem.Application.DTOs.Attendance;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class AttendanceService(IAttendanceRepository _attendanceRepository) : IAttendanceService
    {
        public async Task<AttendanceResponseDto> CreateAttendanceAsync(CreateAttendanceDto createAttendanceDto)
        {
            var attendance = new Attendance
            {
                EmployeeId = createAttendanceDto.EmployeeId,
                Date = createAttendanceDto.Date,
                TimeIn = createAttendanceDto.TimeIn,
                TimeOut = createAttendanceDto.TimeOut,
                AttendanceStatus = createAttendanceDto.AttendanceStatus,
            };

            if (attendance.TimeOut.HasValue && attendance.TimeOut.Value < attendance.TimeIn)
            {
                throw new ArgumentException("TimeOut cannot be earlier than TimeIn.");
            }


            if (attendance.TimeOut.HasValue)
            {

                attendance.TotalHours = (decimal)(attendance.TimeOut.Value - attendance.TimeIn).TotalHours;
            }
            var newAttendance = await _attendanceRepository.CreateAttendanceAsync(attendance);

            return new AttendanceResponseDto
            {
                Id = newAttendance.Id,
                EmployeeId = newAttendance.EmployeeId,
                EmployeeName = newAttendance.Employee?.FirstName,
                Date = newAttendance.Date,
                TimeIn = newAttendance.TimeIn,
                TimeOut = newAttendance.TimeOut,
                AttendanceStatus = newAttendance.AttendanceStatus,
                TotalHours = newAttendance.TotalHours,
            };
        }

        public async Task<bool> DeleteAttendanceAsync(int id)
        {
            var attendance = await _attendanceRepository.GetAttendanceByIdAsync(id);
            if (attendance == null)
            {
                return false;
            }
            await _attendanceRepository.DeleteAttendanceAsync(attendance.Id);
            return true;
        }

        public async Task<IEnumerable<AttendanceResponseDto>> GetAllAttendancesAsync()
        {
            var attendances = await _attendanceRepository.GetAllAttendancesAsync();
            return attendances.Select(x => new AttendanceResponseDto
            {
                Id = x.Id,
                EmployeeId = x.Employee.Id,
                EmployeeName = x.Employee.FirstName,
                Date = x.Date,
                TimeIn = x.TimeIn,
                TimeOut = x.TimeOut,
                AttendanceStatus = x.AttendanceStatus,
                TotalHours = x.TotalHours,
            });
        }

        public async Task<AttendanceResponseDto> GetAttendanceByIdAsync(int id)
        {
            var attendance = await _attendanceRepository.GetAttendanceByIdAsync(id);

            if (attendance == null)
            {
                throw new ArgumentException("Attendance not found");
            }

            return new AttendanceResponseDto
            {
                Id = attendance.Id,
                EmployeeId = attendance.EmployeeId,
                EmployeeName = attendance.Employee?.FirstName,
                Date = attendance.Date,
                TimeIn = attendance.TimeIn,
                TimeOut = attendance.TimeOut,
                AttendanceStatus = attendance.AttendanceStatus,
                TotalHours = attendance.TotalHours,

            };
        }

        public async Task<AttendanceResponseDto> UpdateAttendanceAsync(int id, UpdateAttendanceDto updateAttendanceDto)
        {
            var existingAttendance = await _attendanceRepository.GetAttendanceByIdAsync(id);
            if (existingAttendance == null)
            {
                throw new ArgumentException("Attendance not found");
            }

            existingAttendance.EmployeeId = updateAttendanceDto.EmployeeId;
            existingAttendance.Date = updateAttendanceDto.Date;
            existingAttendance.TimeIn = updateAttendanceDto.TimeIn;
            existingAttendance.TimeOut = updateAttendanceDto.TimeOut;
            existingAttendance.AttendanceStatus = updateAttendanceDto.AttendanceStatus;
            if (existingAttendance.TimeOut.HasValue)
            {
                existingAttendance.TotalHours = (decimal)(existingAttendance.TimeOut.Value - existingAttendance.TimeIn).TotalHours;
            }

            var updatedAttendance = await _attendanceRepository.UpdateAttendanceAsync(existingAttendance);

            return new AttendanceResponseDto
            {
                Id = updatedAttendance.Id,
                EmployeeId = updatedAttendance.EmployeeId,
                EmployeeName = updatedAttendance.Employee?.FirstName,
                Date = updatedAttendance.Date,
                TimeIn = updatedAttendance.TimeIn,
                TimeOut = updatedAttendance.TimeOut,
                AttendanceStatus = updatedAttendance.AttendanceStatus,
                TotalHours = updatedAttendance.TotalHours,
            };


        }
    }
}

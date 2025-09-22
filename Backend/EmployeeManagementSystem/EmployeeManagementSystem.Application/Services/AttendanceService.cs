using EmployeeManagementSystem.Application.DTOs.Attendance;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class AttendanceService(IAttendanceRepository _attendanceRepository) : IAttendanceService
    {
        private static readonly TimeSpan PhilippineOffset = TimeSpan.FromHours(8);

        public async Task<AttendanceResponseDto> CreateAttendanceAsync(CreateAttendanceDto createAttendanceDto)
        {
            var attendance = new Attendance
            {
                EmployeeId = createAttendanceDto.EmployeeId,
                Date = createAttendanceDto.Date.DateTime, // store as DateTime
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
                // Ensure both times are in the same timezone for accurate calculation
                var timeInUtc = attendance.TimeIn.ToUniversalTime();
                var timeOutUtc = attendance.TimeOut.Value.ToUniversalTime();
                attendance.TotalHours = (decimal)(timeOutUtc - timeInUtc).TotalHours;
            }

            var newAttendance = await _attendanceRepository.CreateAttendanceAsync(attendance);

            return new AttendanceResponseDto
            {
                Id = newAttendance.Id,
                EmployeeId = newAttendance.EmployeeId,
                EmployeeName = newAttendance.Employee?.FirstName,
                Date = newAttendance.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = newAttendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = newAttendance.TimeOut?.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
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
                Date = x.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = x.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = x.TimeOut?.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
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
                Date = attendance.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = attendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = attendance.TimeOut?.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
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

            existingAttendance.Date = updateAttendanceDto.Date.DateTime;
            existingAttendance.TimeIn = updateAttendanceDto.TimeIn;
            existingAttendance.TimeOut = updateAttendanceDto.TimeOut;
            existingAttendance.AttendanceStatus = updateAttendanceDto.AttendanceStatus;

            // Validate that TimeOut is not earlier than TimeIn
            if (existingAttendance.TimeOut.HasValue && existingAttendance.TimeOut.Value < existingAttendance.TimeIn)
            {
                throw new ArgumentException("TimeOut cannot be earlier than TimeIn.");
            }

            if (existingAttendance.TimeOut.HasValue)
            {
                // Ensure both times are in the same timezone for accurate calculation
                var timeInUtc = existingAttendance.TimeIn.ToUniversalTime();
                var timeOutUtc = existingAttendance.TimeOut.Value.ToUniversalTime();
                existingAttendance.TotalHours = (decimal)(timeOutUtc - timeInUtc).TotalHours;
            }

            var updatedAttendance = await _attendanceRepository.UpdateAttendanceAsync(existingAttendance);

            return new AttendanceResponseDto
            {
                Id = updatedAttendance.Id,
                EmployeeId = updatedAttendance.EmployeeId,
                EmployeeName = updatedAttendance.Employee?.FirstName,
                Date = updatedAttendance.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = updatedAttendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = updatedAttendance.TimeOut?.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                AttendanceStatus = updatedAttendance.AttendanceStatus,
                TotalHours = updatedAttendance.TotalHours,
            };
        }
    }
}

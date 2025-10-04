using EmployeeManagementSystem.Application.DTOs.Attendance;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Enum;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private static readonly TimeSpan PhilippineOffset = TimeSpan.FromHours(8);

        public AttendanceService(IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        public async Task<AttendanceResponseDto> CreateAttendanceAsync(CreateAttendanceDto createAttendanceDto)
        {
            var attendance = new Attendance
            {
                EmployeeId = createAttendanceDto.EmployeeId,
                TimeIn = createAttendanceDto.TimeIn,
            };

            var shiftStart = new DateTimeOffset(
                attendance.Date.Year,
                attendance.Date.Month,
                attendance.Date.Day,
                9, 0, 0, PhilippineOffset
            );

            var shiftEnd = new DateTimeOffset(
                attendance.Date.Year,
                attendance.Date.Month,
                attendance.Date.Day,
                18, 0, 0, PhilippineOffset // 6:00 PM
            );

            if (attendance.TimeIn > shiftStart.AddMinutes(5))
            {
                attendance.AttendanceStatus = AttendanceStatus.Late;
            }
            else
            {
                attendance.AttendanceStatus = AttendanceStatus.Present;
            }

            var newAttendance = await _attendanceRepository.CreateAttendanceAsync(attendance);

            return new AttendanceResponseDto
            {
                Id = newAttendance.Id,
                EmployeeId = newAttendance.EmployeeId,
                EmployeeFirstName = newAttendance?.Employee?.FirstName,
                EmployeeLastName = newAttendance?.Employee?.LastName,
                Date = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss"), // Convert DateTime to string using a format
                TimeIn = newAttendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
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
                EmployeeFirstName = x.Employee.FirstName,
                EmployeeLastName = x.Employee.LastName,
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
                EmployeeFirstName = attendance?.Employee?.FirstName,
                EmployeeLastName = attendance?.Employee?.LastName,
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

            existingAttendance.TimeOut = updateAttendanceDto.TimeOut;

            // Validate that TimeOut is not earlier than TimeIn
            if (existingAttendance.TimeOut.HasValue && existingAttendance.TimeOut.Value < existingAttendance.TimeIn)
            {
                throw new ArgumentException("TimeOut cannot be earlier than TimeIn.");
            }

            if (existingAttendance.TimeOut.HasValue)
            {
                // Calculate TotalHours directly without assigning unused variables
                existingAttendance.TotalHours = (decimal)(existingAttendance.TimeOut.Value - existingAttendance.TimeIn).TotalHours;
            }

            var updatedAttendance = await _attendanceRepository.UpdateAttendanceAsync(existingAttendance);

            return new AttendanceResponseDto
            {
                Id = updatedAttendance.Id,
                EmployeeId = updatedAttendance.EmployeeId,
                EmployeeFirstName = updatedAttendance?.Employee?.FirstName,
                EmployeeLastName = updatedAttendance?.Employee?.LastName,
                Date = updatedAttendance.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = updatedAttendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = updatedAttendance.TimeOut?.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                AttendanceStatus = updatedAttendance.AttendanceStatus,
                TotalHours = updatedAttendance.TotalHours,
            };
        }
    }
}

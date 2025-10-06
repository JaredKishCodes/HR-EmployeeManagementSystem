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
                Date = createAttendanceDto.TimeIn.Date  // ✅ This was missing before
            };

            var shiftStart = new DateTimeOffset(
                attendance.TimeIn.Year,
                attendance.TimeIn.Month,
                attendance.TimeIn.Day,
                9, 0, 0, PhilippineOffset
            );

            var shiftEnd = new DateTimeOffset(
                attendance.TimeIn.Year,
                attendance.TimeIn.Month,
                attendance.TimeIn.Day,
                18, 0, 0, PhilippineOffset
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
                Date = newAttendance.Date.ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeIn = newAttendance.TimeIn.ToOffset(PhilippineOffset).ToString("yyyy-MM-ddTHH:mm:ss"),
                TimeOut = null,
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

            if (existingAttendance.TimeOut.HasValue)
            {
                // Calculate the difference directly without timezone conversion
                if (existingAttendance.TimeOut.Value < existingAttendance.TimeIn)
                {
                    throw new ArgumentException("TimeOut cannot be earlier than TimeIn.");
                }

                existingAttendance.TotalHours = (decimal)(existingAttendance.TimeOut.Value - existingAttendance.TimeIn).TotalHours;

                Console.WriteLine($"TimeIn: {existingAttendance.TimeIn}");
                Console.WriteLine($"TimeOut: {existingAttendance.TimeOut}");
                Console.WriteLine($"TotalHours: {existingAttendance.TotalHours}");
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

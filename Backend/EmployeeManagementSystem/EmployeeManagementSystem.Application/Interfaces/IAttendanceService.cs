
using EmployeeManagementSystem.Application.DTOs.Attendance;
using EmployeeManagementSystem.Domain.Entities;


namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface IAttendanceService
    {
        Task<IEnumerable<AttendanceResponseDto>> GetAllAttendancesAsync();
        Task<IEnumerable<AttendanceResponseDto>> GetAttendaceByEmployeeId(int employeeId);
        Task<AttendanceResponseDto> GetAttendanceByIdAsync(int id);
        Task<AttendanceResponseDto> CreateAttendanceAsync(CreateAttendanceDto createAttendanceDto);
        Task<AttendanceResponseDto> UpdateAttendanceAsync(int id, UpdateAttendanceDto updateAttendanceDto);
        Task<bool> DeleteAttendanceAsync(int id);
    }
}

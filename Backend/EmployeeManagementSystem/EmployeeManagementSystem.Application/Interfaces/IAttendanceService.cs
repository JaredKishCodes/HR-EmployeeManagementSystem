
using EmployeeManagementSystem.Application.DTOs.Attendance;


namespace EmployeeManagementSystem.Application.Interfaces
{
    public interface IAttendanceService
    {
        Task<IEnumerable<AttendanceResponseDto>> GetAllAttendancesAsync();
        Task<AttendanceResponseDto> GetAttendanceByIdAsync(int id);
        Task<AttendanceResponseDto> CreateAttendanceAsync(CreateAttendanceDto createAttendanceDto);
        Task<AttendanceResponseDto> UpdateAttendanceAsync(int id, UpdateAttendanceDto updateAttendanceDto);
        Task<bool> DeleteAttendanceAsync(int id);
    }
}

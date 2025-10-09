
using EmployeeManagementSystem.Application.DTOs.Auth;

namespace EmployeeManagementSystem.Application.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<LoginResponse> LoginAsync(LoginDto loginDto);
    }
}

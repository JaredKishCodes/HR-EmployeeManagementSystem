

using EmployeeManagementSystem.Application.DTOs.Auth;

namespace EmployeeManagementSystem.Application.Interfaces.Auth
{
    public interface IJwtTokenService
    {
        Task<string> CreateTokenAsync(UserDto user, List<string> roles); 
    }
}

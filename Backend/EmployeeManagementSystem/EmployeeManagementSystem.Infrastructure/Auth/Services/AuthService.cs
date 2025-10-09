using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementSystem.Application.DTOs.Auth;
using EmployeeManagementSystem.Application.Interfaces.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Infrastructure.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
       

        public AuthService(UserManager<AppUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<LoginResponse> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                throw new UnauthorizedAccessException("Invalid credentials");

          

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            var token = await _jwtTokenService.CreateTokenAsync(new UserDto
            {
                Id = user.Id, // adjust if Id is Guid or string
                Email = user.Email!,
                FullName = user.FullName
            }, roles.ToList());

            return new LoginResponse
            {
                
                Token = token,
                Role = role,
                Email = user.Email!,
                FullName = user.FullName
            };
        }


        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            // Check if user already exists
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
                throw new ApplicationException("User already exists with this email.");

            // Create user
            var newUser = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                FullName = registerDto.FullName
            };

            var createdUser = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!createdUser.Succeeded)
            {
                var errors = string.Join(", ", createdUser.Errors.Select(e => e.Description));
                throw new ApplicationException($"User creation failed: {errors}");
            }

            var usersCount = await _userManager.Users.CountAsync();

            if (usersCount == 1)
            {
                await _userManager.AddToRoleAsync(newUser, "Admin");
            }
            else
            {
                await _userManager.AddToRoleAsync(newUser, "Customer");
            }




            var roles = await _userManager.GetRolesAsync(newUser);
            // Generate JWT
            var token = await _jwtTokenService.CreateTokenAsync(new UserDto
            {
                Id = newUser.Id, // Change this if your AppUser.Id is string or Guid
                Email = newUser.Email!,
                FullName = newUser.FullName
            }, roles.ToList());

            return new AuthResponseDto
            {
                Token = token,
                Email = newUser.Email,
                FullName = newUser.FullName

            };
        }


    }
}

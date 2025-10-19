
using System.Threading.Tasks;
using EmployeeManagementSystem.Application.DTOs.Auth;
using EmployeeManagementSystem.Application.Interfaces.Auth;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmployeeManagementSystem.Infrastructure.Auth.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILogger<AuthService> _logger;
       

        public AuthService(UserManager<AppUser> userManager, IJwtTokenService jwtTokenService, IEmployeeRepository employeeRepository,ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _employeeRepository = employeeRepository;
            _logger = logger;
        }

        public async Task<LoginResponse> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                throw new UnauthorizedAccessException("Invalid credentials");

            var employee = await _employeeRepository.GetEmployeeByUserIdAsync(user.Id);

            //_logger.LogInformation("Employee found: Id={Id}, Name={FirstName} {LastName}, UserId={UserId}, Department={DepartmentId}",
            // employee.Id, employee.FirstName, employee.LastName, employee.UserId, employee.DepartmentId);


            //if (employee == null)
            //    throw new ApplicationException("Employee not found for the given user.");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            var token = await _jwtTokenService.CreateTokenAsync(new UserDto
            {
                Id = user.Id, // adjust if Id is Guid or string
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmployeeId = employee?.Id,
            }, roles.ToList());

            var response = new LoginResponse
            {
                Token = token,
                Role = role,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmployeeId = employee?.Id
            };


            return response;

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
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                PhoneNumber = registerDto.PhoneNumber
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
                await _userManager.AddToRoleAsync(newUser, "Employee");
            }

            var employee = new Employee
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                Position = Domain.Enum.Position.User,
                HireDate = DateTime.UtcNow,
                Status = Domain.Enum.Status.Active,
                DepartmentId = 1,
                Salaries = null,
                UserId = newUser.Id
            };

            _logger.LogInformation("Creating employee: {@Employee}", employee);

            var newEmployee = await _employeeRepository.CreateEmployeeAsync(employee);  

            if (newEmployee == null)
            {
                throw new ArgumentNullException(nameof(newEmployee), "New employee is null");
            }

            var roles = await _userManager.GetRolesAsync(newUser);
            // Generate JWT
            var token = await _jwtTokenService.CreateTokenAsync(new UserDto
            {
                Id = newUser.Id, // Change this if your AppUser.Id is string or Guid
                Email = newUser.Email!,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,               
            }, roles.ToList());

            return new AuthResponseDto
            {
                Token = token,
                Email = newUser.Email,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                PhoneNumber = newUser.PhoneNumber

            };
        }


    }
}

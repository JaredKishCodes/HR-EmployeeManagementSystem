﻿using EmployeeManagementSystem.Application.DTOs.Auth;
using EmployeeManagementSystem.Application.Interfaces.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAuthService authService,ILogger<AccountController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _authService.RegisterAsync(registerDto);
                return Ok(new AuthResponseDto
                {
                    Success = true,
                    Message = "Registered successfully.",
                    Token = response.Token,
                    Email = response.Email,
                    FirstName = response.FirstName,
                    LastName =response.LastName,
                });
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new AuthResponseDto
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _authService.LoginAsync(loginDto);
                var result = new LoginResponse
                {
                    Success = true,
                    Message = "Login successfully.",
                    Role = response.Role,
                    Token = response.Token,
                    Email = response.Email,
                    FirstName = response.FirstName,
                    LastName = response.LastName,
                    EmployeeId = response.EmployeeId
                };

        

                return Ok(result);

            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new LoginResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new LoginResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
    }
}

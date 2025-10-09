﻿

namespace EmployeeManagementSystem.Application.DTOs.Auth
{   
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public string? Role { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
   }
   
}

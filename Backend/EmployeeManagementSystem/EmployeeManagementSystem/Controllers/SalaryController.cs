using EmployeeManagementSystem.Application.DTOs.Salary;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;


namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;
        private readonly ISalaryRepository _salaryRepository;

        public SalaryController(ISalaryService salaryService , ISalaryRepository salaryRepository)
        {
            _salaryService = salaryService;
            _salaryRepository = salaryRepository;
        }
        [Authorize(Roles = "Admin,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpGet("getSalaries")]
        public async Task<ActionResult<IEnumerable<SalaryResponse>>> GetSalariesAsync()
        {
            var result = await _salaryService.GetAllSalariesAsync();
            return Ok(result);
        }
        [Authorize(Roles = "Admin,Employee,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpGet("getSalaryByEmployeeId/{employeeId}")]
        public async Task<ActionResult<IEnumerable<SalaryResponse>>> GetSalaryByEmployeeId(int employeeId)
        {
            var result = await _salaryRepository.GetSalaryByEmployeeId(employeeId);

            if (result == null || !result.Any())
            {
                return Ok(new List<SalaryResponse>());
            }

            return Ok(result);
        }

        [Authorize(Roles = "Admin,Employee,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpGet("getSalary/{id}")]
        public async Task<ActionResult<SalaryResponse>> GetSalaryByIdAsync(int id)
        {
            var result = await _salaryService.GetSalaryByIdAsync(id);
            if (result == null)
                return NotFound($"Salary with ID {id} not found");

            return Ok(result);
        }
        [Authorize(Roles = "Admin,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpPost("addSalary")]
        public async Task<ActionResult<SalaryResponse>> AddSalary([FromBody] AddSalaryDto addSalaryDto)
        {
            var result = await _salaryService.AddSalaryAsync(addSalaryDto);

            return Ok(result);
        }
        [Authorize(Roles = "Admin,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpPut("updateSalary/{id}")]
        public async Task<ActionResult<SalaryResponse>> UpdateSalaryAsync(int id, [FromBody] UpdateSalaryDto updateSalaryDto)
        {
            var result = await _salaryService.UpdateSalaryAsync(id, updateSalaryDto);
            if (result == null)
                return NotFound($"Salary with ID {id} not found");

            return Ok(result);
        }

        [Authorize(Roles = "Admin,SystemAdministrator,AdminStaff,DepartmentHeads")]
        [HttpDelete("deleteSalary/{id}")]
        public async Task<IActionResult> DeleteSalaryAsync(int id)
        {
            var result = await _salaryService.DeleteSalaryAsync(id);
            if (!result)
                return NotFound($"Salary with ID {id} not found");

            return NoContent();
        }
    }
}

using EmployeeManagementSystem.Application.DTOs.Salary;
using EmployeeManagementSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet("getSalaries")]
        public async Task<ActionResult<IEnumerable<SalaryResponse>>> GetSalariesAsync()
        {
            var result = await _salaryService.GetAllSalariesAsync();
            return Ok(result);
        }

        [HttpGet("getSalary/{id}")]
        public async Task<ActionResult<SalaryResponse>> GetSalaryByIdAsync(int id)
        {
            var result = await _salaryService.GetSalaryByIdAsync(id);
            if (result == null)
                return NotFound($"Salary with ID {id} not found");

            return Ok(result);
        }

        [HttpPost("addSalary")]
        public async Task<ActionResult<SalaryResponse>> AddSalary([FromBody] AddSalaryDto addSalaryDto)
        {
            var result = await _salaryService.AddSalaryAsync(addSalaryDto);

            return Ok(result);
        }

        [HttpPut("updateSalary/{id}")]
        public async Task<ActionResult<SalaryResponse>> UpdateSalaryAsync(int id, [FromBody] UpdateSalaryDto updateSalaryDto)
        {
            var result = await _salaryService.UpdateSalaryAsync(id, updateSalaryDto);
            if (result == null)
                return NotFound($"Salary with ID {id} not found");

            return Ok(result);
        }

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

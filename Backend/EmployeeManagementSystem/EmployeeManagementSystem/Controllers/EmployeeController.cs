using EmployeeManagementSystem.Application.DTOs.Employee;
using EmployeeManagementSystem.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            if (employees == null || !employees.Any())
            {
                return NotFound("Employees not found");
            }
            return Ok(employees);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EmployeeResponseDto>> GetEmployeeById(int id)
        {
            var employee = _employeeService.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeResponseDto>> CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Error creating employee");
            }

            var employee = await _employeeService.CreateEmployeeAsync(createEmployeeDto);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeResponseDto>> UpdateEmployee(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            if (updateEmployeeDto is null)
            {
                return NotFound("Invalid update request");
            }

            try
            {
                var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, updateEmployeeDto);
                return Ok(updatedEmployee);
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
          

            try
            {
                var deletedEmployee = await _employeeService.DeleteEmployeeAsync(id);
                return Ok(deletedEmployee);
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

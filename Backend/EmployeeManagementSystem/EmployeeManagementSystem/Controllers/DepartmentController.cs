using EmployeeManagementSystem.Application.DTOs.Department;
using EmployeeManagementSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        // POST: api/Department
        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartment createDepartment)
        {
            if (createDepartment == null)
                return BadRequest("Invalid department data");

            var department = await _departmentService.CreateDepartmentAsync(createDepartment);
            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.Id }, department);
        }

        // GET: api/Department
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentResponse>>> GetAllDepartments()
        {
            var departments = await _departmentService.GetAllDepartmentsAsync();
            return Ok(departments);
        }

        // GET: api/Department/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DepartmentResponse>> GetDepartmentById(int id)
        {
            var department = await _departmentService.GetDepartmentByIdAsync(id);
            if (department == null)
                return NotFound($"Department with ID {id} not found");

            return Ok(department);
        }

        // PUT: api/Department/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] CreateDepartment updateDepartment)
        {
            if (updateDepartment == null)
                return BadRequest("Invalid update request");

            try
            {
                var department = await _departmentService.UpdateDepartmentAsync(id, updateDepartment);
                return Ok(department);
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/Department/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var result = await _departmentService.DeleteDepartmentAsync(id);
            if (!result)
                return NotFound($"Department with ID {id} not found");

            return NoContent();
        }
    }
}

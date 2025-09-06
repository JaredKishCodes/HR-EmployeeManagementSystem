using EmployeeManagementSystem.Application.DTOs.Attendance;
using EmployeeManagementSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        //  GET all attendances
        [HttpGet]
        public async Task<IActionResult> GetAllAttendances()
        {
            var attendances = await _attendanceService.GetAllAttendancesAsync();
            return Ok(attendances);
        }

        //  GET attendance by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAttendanceById(int id)
        {
            try
            {
                var attendance = await _attendanceService.GetAttendanceByIdAsync(id);
                return Ok(attendance);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        //  POST create new attendance
        [HttpPost]
        public async Task<IActionResult> CreateAttendance([FromBody] CreateAttendanceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var newAttendance = await _attendanceService.CreateAttendanceAsync(dto);
                return CreatedAtAction(nameof(GetAttendanceById), new { id = newAttendance.Id }, newAttendance);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //  PUT update attendance
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(int id, [FromBody] UpdateAttendanceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedAttendance = await _attendanceService.UpdateAttendanceAsync(id, dto);
                return Ok(updatedAttendance);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // DELETE attendance
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var success = await _attendanceService.DeleteAttendanceAsync(id);
            if (!success)
                return NotFound(new { message = "Attendance not found" });

            return NoContent();
        }
    }
}

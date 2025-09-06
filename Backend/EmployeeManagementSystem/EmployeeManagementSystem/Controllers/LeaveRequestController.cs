using EmployeeManagementSystem.Application.DTOs.LeaveRequest;
using EmployeeManagementSystem.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestService _leaveRequestService;
        public LeaveRequestController(ILeaveRequestService leaveRequestService)
        {
            _leaveRequestService = leaveRequestService;
        }

        [HttpGet("GetAllLeaveRequests")]
        public async Task<ActionResult<LeaveRequestResponseDto>> GetAllLeaveRequests()
        {
            var leaveRequests = await _leaveRequestService.GetAllLeaveRequestsAsync();
            if (leaveRequests == null || !leaveRequests.Any())
            {
                return NotFound("Leave Requests not found");
            }
            return Ok(leaveRequests);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<LeaveRequestResponseDto>> GetLeaveRequestById(int id)
        {
            var leaveRequest = await _leaveRequestService.GetLeaveRequestByIdAsync(id);
            return Ok(leaveRequest);
        }

        [HttpPost("CreateLeaveRequest")]
        public async Task<ActionResult<LeaveRequestResponseDto>> CreateLeaveRequestAsync([FromBody]CreateLeaveRequestDto createLeaveRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Error creating leave request");
            }
            var leaveRequest = await _leaveRequestService.CreateLeaveRequestAsync(createLeaveRequestDto);
            if (leaveRequest == null)
            {
                return NotFound("Leave Request not found");
            }
            return Ok(leaveRequest);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<LeaveRequestResponseDto>> UpdateLeaveRequestDto( int id, [FromBody] UpdateLeaveRequestDto updateLeaveRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Error creating leave request");
            }

            var leaveRequest = await _leaveRequestService.UpdateLeaveRequestAsync( id, updateLeaveRequestDto);

            if (leaveRequest == null)
            {
                return NotFound("Leave Request not found");
            }

            return Ok(leaveRequest);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveRequest(int id)
        {
            var isDeleted = await _leaveRequestService.DeleteLeaveRequestByIdAsync(id);
            if (!isDeleted)
            {
                return NotFound("Leave Request not found");
            }
            return Ok("Leave Request deleted successfully");
        }
    }
}

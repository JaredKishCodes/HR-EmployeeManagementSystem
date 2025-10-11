using EmployeeManagementSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepository _dashboardRepository;
        public DashboardController(IDashboardRepository dashboardRepository) {

            _dashboardRepository = dashboardRepository;
        }

        [HttpGet("getEmployeesCount")]
        public async Task<ActionResult<int>> GetEmployeesCount()
        {
            var emp = await _dashboardRepository.GetEmployeesCountAsync();

            if (emp == 0)
            {
                return NotFound("No Employees Found");
            }

            return Ok(emp);
        }

        [HttpGet("getDepartmentsCount")]
        public async Task<ActionResult<int>> GetDepartmentsCount()
        {
            var dep = await _dashboardRepository.GetDepartmentsCountAsync();

            if (dep == 0)
            {
                return NotFound("No Departments Found");
            }

            return Ok(dep);
        }

        [HttpGet("getLeavesCount")]
        public async Task<ActionResult<int>> GetLeavesCount()
        {
            var leaves = await _dashboardRepository.GetLeavesCountAsync();

            if (leaves == 0)
            {
                return NotFound("No Leaves Found");
            }

            return Ok(leaves);
        }

        [HttpGet("getPayrollCount")]
        public async Task<ActionResult<decimal>> GetPayrollCountAsync()
        {
            var payroll = await _dashboardRepository.GetPayrollCountAsync();

            if (payroll == 0)
            {
                return NotFound("No Payroll Found");
            }

            return Ok(payroll);
        }

        [HttpGet("getPendingLeavesCountAsync")]
        public async Task<ActionResult<int>> GetPendingLeavesCountAsync()
        {
            var pendingLeaves = await _dashboardRepository.GetPendingLeavesCountAsync();

            if (pendingLeaves == 0)
            { 
                
                return NotFound("No Payroll Found");
            }

            return Ok(pendingLeaves);
        }
    }   

}

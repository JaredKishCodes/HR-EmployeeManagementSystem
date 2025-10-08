

using EmployeeManagementSystem.Application.DTOs.Employee;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class EmployeeService(IEmployeeRepository _employeeRepository,IDepartmentRepository _departmentRepository,ISalaryRepository _salaryRepository) 
                                : IEmployeeService
    {
        public async Task<EmployeeResponseDto> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto)
        {
           
            var department = await _departmentRepository.GetDepartmentByIdAsync(createEmployeeDto.DepartmentId);
            if (department == null)
            {
                throw new Exception($"Department with Id {createEmployeeDto.DepartmentId} does not exist.");
            }

           
            var employee = new Employee
            {
                FirstName = createEmployeeDto.FirstName,
                LastName = createEmployeeDto.LastName,
                Email = createEmployeeDto.Email,
                PhoneNumber = createEmployeeDto.PhoneNumber,
                Position = createEmployeeDto.Position,
                HireDate = createEmployeeDto.HireDate,
                Status = createEmployeeDto.Status,
                DepartmentId = createEmployeeDto.DepartmentId
            };

            await _employeeRepository.CreateEmployeeAsync(employee);


            return new EmployeeResponseDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                Position = employee.Position,
                HireDate = employee.HireDate,
                Status = employee.Status,
                DepartmentName = department.Name,
                

            };
        }


        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null)
                return false; 

            return await _employeeRepository.DeleteEmployeeAsync(id);
        }


        public async Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeesAsync()
        {   
            var employees = await _employeeRepository.GetAllEmployeesAsync();
            

            return employees.Select(x => new EmployeeResponseDto
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Position = x.Position,
                HireDate = x.HireDate,
                Status = x.Status,
                DepartmentName = x.Department?.Name,
                
               
            });
        }

        public async Task<EmployeeResponseDto> GetEmployeeByIdAsync(int id)
        {
            
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            var salary = await _salaryRepository.GetLatestSalaryByEmployeeIdAsync(id);

            
            if (employee == null)
                throw new ArgumentException($"Employee with ID {id} not found.");

            
            var employeeDto = new EmployeeResponseDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                Position = employee.Position,
                HireDate = employee.HireDate,
                Status = employee.Status,
                DepartmentName = employee.Department?.Name,
                Salary = salary.TotalSalary 

            };

            return employeeDto;
        }


        public async Task<EmployeeResponseDto> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

            if (employee == null)
                throw new ArgumentException($"Employee with ID {id} not found.");

            employee.FirstName = updateEmployeeDto.FirstName;
            employee.LastName = updateEmployeeDto.LastName;
            employee.Email = updateEmployeeDto.Email;
            employee.PhoneNumber = updateEmployeeDto.PhoneNumber;
            employee.Position = updateEmployeeDto.Position;
            employee.HireDate = updateEmployeeDto.HireDate;
            employee.Status = updateEmployeeDto.Status;
            employee.DepartmentId = updateEmployeeDto.DepartmentId;

            var updatedEmployee = await _employeeRepository.UpdateEmployeeAsync(employee);

            var department = await _departmentRepository.GetDepartmentByIdAsync(updateEmployeeDto.DepartmentId);

            return new EmployeeResponseDto
            {
                Id = employee.Id,
                FirstName = updatedEmployee.FirstName,
                LastName = updatedEmployee.LastName,
                Email = updatedEmployee.Email,
                PhoneNumber = updatedEmployee.PhoneNumber,
                Position = updatedEmployee.Position,
                HireDate = updatedEmployee.HireDate,
                Status = updatedEmployee.Status,
                DepartmentName = department?.Name
            };
        }
    }
}

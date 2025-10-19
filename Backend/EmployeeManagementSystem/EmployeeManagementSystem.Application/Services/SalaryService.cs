

using EmployeeManagementSystem.Application.DTOs.Salary;
using EmployeeManagementSystem.Application.Interfaces;
using EmployeeManagementSystem.Domain.Entities;
using EmployeeManagementSystem.Domain.Interfaces;

namespace EmployeeManagementSystem.Application.Services
{
    public class SalaryService(ISalaryRepository salaryRepository,IEmployeeRepository employeeRepository) 
                              : ISalaryService
    {
       
        public async Task<SalaryResponse> AddSalaryAsync(AddSalaryDto addSalaryDto)
        {
            var employee = await employeeRepository.GetEmployeeByIdAsync(addSalaryDto.EmployeeId);

            if (employee == null)
                throw new ArgumentNullException(nameof(employee), "Employee not found");

            if (employee.Department == null)
                throw new ArgumentNullException(nameof(employee.Department), "Employee's department not found");

            if (!addSalaryDto.PayDate.HasValue)
                throw new ArgumentException("PayDate cannot be null", nameof(addSalaryDto.PayDate));

            var salary = new Salary
            {
                EmployeeId = employee.Id,
                BasicSalary = addSalaryDto.BasicSalary,
                Allowances = addSalaryDto.Allowance,
                Deductions = addSalaryDto.Deductions,
                PayDate = addSalaryDto.PayDate.Value,
                TotalSalary = addSalaryDto.BasicSalary + addSalaryDto.Allowance - addSalaryDto.Deductions
            };

            var result = await salaryRepository.AddSalaryAsync(salary);

            return new SalaryResponse
            {
                Id = result.Id,
                EmployeeName = employee.FirstName ?? "Unknown", // Null check added
                DepartmentName = employee.Department.Name ?? "Unknown", // Null check added
                BasicSalary = result.BasicSalary,
                Allowance = result.Allowances,
                Deductions = result.Deductions,
                PayDate = addSalaryDto.PayDate?.Date ?? DateTime.Now.Date,
                TotalSalary = result.TotalSalary

            };
        }

        public async Task<bool> DeleteSalaryAsync(int id)
        {
            if (id <= 0)
            {
                return false;
            }

            return await salaryRepository.DeleteSalaryAsync(id);

        }

        public async Task<IEnumerable<SalaryResponse>> GetAllSalariesAsync()
        {
            var salary = await salaryRepository.GetAllSalariesAsync();

            
            return salary.Select(x => new SalaryResponse
            {   
                Id = x.Id,
                EmployeeName = x.Employee?.FirstName ?? "Unknown", // Null check added
                DepartmentName = x.Employee?.Department?.Name ?? "Unknown",  // Null check added
                BasicSalary = x.BasicSalary,
                Allowance = x.Allowances,
                Deductions = x.Deductions,
                PayDate = x.PayDate,
                TotalSalary =x.TotalSalary
            });
        }

        public async Task<SalaryResponse?> GetSalaryByIdAsync(int id)
        {
            var salary = await salaryRepository.GetSalaryByIdAsync(id);
            if (salary == null)
            {
                return null;
            }

            return new SalaryResponse
            {   
                Id = salary.Id,
                EmployeeName = salary.Employee?.FirstName ?? "Unknown", // Null check added
                DepartmentName = salary.Employee?.Department?.Name ?? "Unknown",  // Null check added
                BasicSalary = salary.BasicSalary,
                Allowance = salary.Allowances,
                Deductions = salary.Deductions,
                PayDate = salary.PayDate,
                TotalSalary = salary.TotalSalary
            };
        }

        public async Task<SalaryResponse?> UpdateSalaryAsync(int id, UpdateSalaryDto updateSalaryDto)
        {
            if (id <= 0) { 
                throw new ArgumentOutOfRangeException(nameof(id));
            }

            if (updateSalaryDto == null) { 
                throw new ArgumentNullException(nameof(updateSalaryDto));
            }

            var existingSalary = await salaryRepository.GetSalaryByIdAsync(id);

            if (existingSalary == null) { 
                return null;
            }

            else
            {
                existingSalary.BasicSalary = updateSalaryDto.BasicSalary;
                existingSalary.Allowances = updateSalaryDto.Allowance;
                existingSalary.Deductions = updateSalaryDto.Deductions;
           
            }

            existingSalary.TotalSalary = updateSalaryDto.BasicSalary + updateSalaryDto.Allowance - updateSalaryDto.Deductions;

             var result = await salaryRepository.UpdateSalaryAsync(existingSalary);

                 return new SalaryResponse
                 {   Id = result.Id,
                     EmployeeName = result.Employee?.FirstName ?? "Unknown", // Null check added
                     DepartmentName = result.Employee?.Department?.Name ?? "Unknown",  // Null check added
                     BasicSalary = result.BasicSalary,
                     Allowance = result.Allowances,
                     Deductions = result.Deductions,
                     PayDate = result.PayDate,
                     TotalSalary = result.TotalSalary
                 };
        }

        public async Task<IEnumerable<SalaryResponse>> GetSalariesByEmployeeId(int employeeId)
        {
            var salaries = await salaryRepository.GetSalaryByEmployeeId(employeeId);

            return salaries.Select(salary => new SalaryResponse
            {
                Id = salary?.Id ?? 0,
                EmployeeName = salary?.Employee?.FirstName ?? "Unknown", // Null check added
                DepartmentName = salary?.Employee?.Department?.Name ?? "Unknown",  // Null check added
                BasicSalary = salary?.BasicSalary ?? 0,
                Allowance = salary?.Allowances ?? 0,
                Deductions = salary?.Deductions ?? 0,
                PayDate = salary?.PayDate ?? DateTime.MinValue,
                TotalSalary = salary?.TotalSalary ?? 0
            });
        }

        
    }
}

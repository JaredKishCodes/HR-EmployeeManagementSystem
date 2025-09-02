﻿

namespace EmployeeManagementSystem.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }  = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public string Status { get; set; } = string.Empty;

        public int DepartmentId { get; set; }
        public Department? Department { get; set; } 

    }
}

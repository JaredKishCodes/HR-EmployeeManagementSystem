import { useEffect, useState } from "react";
import { Department } from "../Types/department";
import { Employee } from "../Types/employee";
import { toast } from "react-toastify";
import api from "../api";

export function usePayroll() {
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [allowances, setAllowances] = useState<number>(0);
  const [deductions, setDeductions] = useState<number>(0);
  const [payDate, setPayDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    var response = await api.get(`/Department`);
    setDepartments(response.data);
    console.log("Departments fetched successfully", response.data);
  };

  const fetchEmployees = async () => {
    try {
      var response = await api.get(`/Employee/GetAllEmployees`);
      setEmployees(response.data);
      console.log("Employee fetched successfully", response.data);
    } catch (error) {
      console.error(console.error);
    }
  };

  const getEmployeesByDepartment = async (deptId: number) => {
    const response = await api.get(
      `/Employee/getEmployeesByDepartment?departmentId=${deptId}`,
    );
    console.log("Employees by department fetched successfully", response.data);

    return response.data;
  };

  const handleDepartmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const deptId = e.target.value;
    setSelectedDepartment(deptId);

    if (deptId) {
      const res = await getEmployeesByDepartment(Number(deptId));
      setEmployees(res);
    } else {
      setEmployees([]);
    }
  };

  const onSubmitPayroll = async () => {
    const payrollObject = {
      employeeId: 1,
      basicSalary,
      allowances,
      deductions,
      payDate,
    };
    try {
      const result = await api.post(`/Salary/addSalary`, payrollObject);
      console.log("Payroll added successfully!", result.data);
      toast.success("Payroll added successfully!");
    } catch (error) {
      console.error("Failed to add payroll");
      toast.error("Failed to add payroll");
    }
  };

  return {
    departmentId,
    setDepartmentId,
    departments,
    setDepartments,
    employeeId,
    setEmployeeId,
    employees,
    setEmployees,
    basicSalary,
    setBasicSalary,
    deductions,
    setDeductions,
    allowances,
    setAllowances,
    payDate,
    setPayDate,
    onSubmitPayroll,
    handleDepartmentChange,
    selectedDepartment,
    setSelectedDepartment,
  };
}

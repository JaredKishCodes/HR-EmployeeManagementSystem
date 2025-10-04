import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { EmployeeRequest, EmployeeResponse } from "../Types/employee";
import * as EmployeeService from "../services/employeeService";
import axios from "axios";
import Swal from "sweetalert2";

export function useEmployees() {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:7273/api/Department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: EmployeeRequest = {
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      status,
      hireDate,
      departmentId: Number(departmentId),
    };

    try {
      if (editingId && isEditMode) {
        const response = await EmployeeService.updateEmployee(
          editingId,
          payload,
        );
        console.log("Employee updated", response);
        toast.success("Employee updated successfully!");
      } else {
        const response = await EmployeeService.createEmployee(payload);

        console.log("Data sent successfully", response);
        toast.success("Employee added successfully!");
      }

      fetchEmployees();
      setIsOpen(false);
      setEditingId(0);
      resetForm();
    } catch (err) {
      console.error("Error sending data", err);
      toast.error("Error sending data");
    }
  };

  const handleEdit = async (id: number) => {
    const employee = await EmployeeService.getEmployee(id);

    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setPhoneNumber(employee.phoneNumber);
      setPosition(employee.position);
      setStatus(employee.status);
      setHireDate(employee.hireDate.split("T")[0]);
      setDepartmentId(employee.departmentId?.toString() ?? "");
    }

    setIsEditMode(true);
    setEditingId(id);
    setIsOpen(true);
  };

  const handleAddButton = () => {
    setIsEditMode(false);
    setEditingId(0);
    setIsOpen(true);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure you want to delete this employee?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await EmployeeService.deleteEmployee(id);
          Swal.fire("Employee deleted successfully!", "", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the record.", "error");
        }
      }
    });
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPosition("");
    setStatus("");
    setHireDate("");
    setDepartmentId("");
    setIsEditMode(false);
    setEditingId(null);
  };

  return {
    employees,
    setEmployees,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    position,
    setPosition,
    status,
    setStatus,
    hireDate,
    setHireDate,
    departmentId,
    setDepartmentId,
    departments,
    setDepartments,

    isEditMode,
    setIsEditMode,
    editingId,
    setEditingId,
    isOpen,
    setIsOpen,

    handleSubmit,
    handleEdit,
    handleAddButton,
    handleDelete,
  };
}

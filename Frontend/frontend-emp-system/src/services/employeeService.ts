import type { EmployeeRequest, EmployeeResponse } from "../Types/employee";
import api from "../api";

export const getAllEmployees = async (): Promise<EmployeeResponse[]> => {
  const res = await api.get("/Employee/GetAllEmployees");
  return res.data;
};

export const getEmployee = async (id: number): Promise<EmployeeResponse> => {
  const res = await api.get("/Employee/" + id);
  return res.data;
};

export const createEmployee = async (
  payload: EmployeeRequest,
): Promise<EmployeeResponse[]> => {
  const res = await api.post("/Employee", payload);
  return res.data;
};

export const updateEmployee = async (
  id: number,
  payload: EmployeeRequest,
): Promise<EmployeeResponse> => {
  const res = await api.put("/Employee/" + id, payload);
  return res.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const res = await api.delete("/Employee/" + id);
  return res.data;
};

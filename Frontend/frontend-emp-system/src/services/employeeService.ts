import axios from "axios";
import type { EmployeeRequest, EmployeeResponse } from "../Types/employee";

const api = axios.create(
    {
        baseURL:"https://localhost:7273/api",
         headers: {
         "Content-Type": "application/json",
        },
    });


export const getAllEmployees = async (): Promise<EmployeeResponse[]> =>{

    const res = await api.get("/Employee/GetAllEmployees");
    return res.data
}

export const getEmployee = async (id:number): Promise<EmployeeResponse> =>{

    const res = await api.get("/Employee/"+id);
    return res.data
}

export const createEmployee = async (payload:EmployeeRequest): Promise<EmployeeResponse[]> =>{

    const res = await api.get("/Employee");
    return res.data
}

export const updateEmployee = async (id:number,payload: EmployeeRequest): Promise<EmployeeResponse> =>{

    const res = await api.get("/Employee/"+id);
    return res.data
}

export const deleteEmployee = async (id:number): Promise<void> =>{

    const res = await api.get("/Employee/"+id);
    return res.data
}
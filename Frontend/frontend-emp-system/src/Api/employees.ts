import type { Employee } from "../Types/employee";
import api from "./axios";




export const getEmployees = async (): Promise<Employee[]> =>{
    const response = await api.get<Employee[]>("Employee/GetAllEmployees")

    return response.data
}
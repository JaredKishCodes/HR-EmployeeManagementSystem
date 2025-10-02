import axios from "axios";
import type { IAttendanceCreateRequest, IAttendanceResponse, IAttendanceUpdateRequest } from "../Types/attendance";


const api = axios.create(
    {
        baseURL:"https://localhost:7273/api",
         headers: {
         "Content-Type": "application/json",
        },
    });


export const getAllAttendance = async ():Promise<IAttendanceResponse[]> => {
    const result = await api.get("/Attendance");
    return result.data
}

export const getAttendance = async (id:number):Promise<IAttendanceResponse> => {
    const result = await api.get("/Attendance/"+id);
    return result.data
}

export const createAttendance = async (payload:IAttendanceCreateRequest):Promise<IAttendanceResponse> => {
    const result = await api.post("/Attendance",payload);
    return result.data
}

export const UpdateAttendance = async (id:number, payload:IAttendanceUpdateRequest):Promise<IAttendanceResponse> => {
    const result = await api.put("/Attendance/"+id,payload );
    return result.data
}

export const deleteAttendance = async (id:number):Promise<void> => {
    const result = await api.delete("/Attendance/"+id);
    return result.data
}
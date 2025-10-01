import axios from "axios";


const api = axios.create(
    {
        baseURL:"https://localhost:7273/api",
         headers: {
         "Content-Type": "application/json",
        },
    });


export const getAllAttendance = async ()=> {
    const result = await api.get("/Attendance");
    return result.data
}
import type { Employee } from "./employee";
import type { AttendanceStatus } from "./enums";

export interface IAttendanceResponse{
    id:number;
    employeeId: number;
    employeeFirstName : string,
    employeeLastName : string
    date:string;
    timeIn: string;
    timeOut:string;
    attendanceStatus:AttendanceStatus
    totalHours: number;
}

export interface IAttendanceCreateRequest{
    employeeId: number;
    timeIn:string;
}

export interface IAttendanceUpdateRequest{
    timeOut:string;
}


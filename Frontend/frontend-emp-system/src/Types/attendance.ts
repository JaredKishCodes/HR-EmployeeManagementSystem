import type { Employee } from "./employee";
import type { AttendanceStatus } from "./enums";

export interface IAttendanceResponse{
    employeeId: number;
    employeeName:Employee;
    date:string;
    timeIn: string;
    timeOut:string;
    attendanceStatus:AttendanceStatus
}

export interface IAttendanceCreateRequest{
    employeeId: number;
    timeIn:string;
}

export interface IAttendanceUpdateRequest{
    timeOut:string;
}


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


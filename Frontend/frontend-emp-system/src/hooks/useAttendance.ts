import { useEffect, useState } from "react"
import * as AttendanceService from "../services/attendanceService"
import type { IAttendanceResponse } from "../Types/attendance";

export function useAttendance(){

    const [attendance, setAttendance] = useState<IAttendanceResponse[]>([])
    const[employeeId,setEmployeeId] = useState(null);
    const[employeeName,setEmployeeName] = useState("");
    const[date, setDate] = useState("");
    const[timeIn,setTimeIn] = useState("");
    const[timeOut,setTimeOut] = useState("");
    const[totalHours,setTotalHours] = useState(null);


    useEffect(()=>{
        fetchAttendance();

    },[])

   const fetchAttendance = async () =>{
        const result = await AttendanceService.getAllAttendance();
        setAttendance(result);
        
   }
    return{
        attendance,
        employeeId,
        date,
        timeIn,
        timeOut,
        employeeName,
        totalHours
    }
}
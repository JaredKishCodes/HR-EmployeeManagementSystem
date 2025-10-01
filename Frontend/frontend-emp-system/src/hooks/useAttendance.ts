import { useEffect, useState } from "react"
import * as AttendanceService from "../services/attendanceService"
import type { IAttendanceResponse } from "../Types/attendance";
import { toast } from "react-toastify";

export function useAttendance(){

    const [attendance, setAttendance] = useState<IAttendanceResponse[]>([])
    const[employeeId,setEmployeeId] = useState(0);
    const[employeeName,setEmployeeName] = useState("");
    const[date, setDate] = useState("");
    const[timeIn,setTimeIn] = useState("");
    const[timeOut,setTimeOut] = useState("");
    const[totalHours,setTotalHours] = useState(null);

     const [isEditMode, setIsEditMode] = useState(false);
      const [editingId, setEditingId] = useState<number | null>(null);
      const [isOpen, setIsOpen] = useState(false);
    


    useEffect(()=>{
        fetchAttendance();

    },[])

   const fetchAttendance = async () =>{
        const result = await AttendanceService.getAllAttendance();
        setAttendance(result);       
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateAttendacePayload = {
            timeOut
        }

         const CreateAttendacePayload = {
            employeeId,
            timeIn
        }

        if(editingId !== null && isEditMode){
            try {
             const response = await AttendanceService.UpdateAttendance(editingId,updateAttendacePayload)
            console.log("Attendance updated successfully!",response);
            toast.success("Attendance updated successfully!");
            } catch (error) {
                console.error("Failed to update Attendance");
                toast.error("Failed to update Attendance");
            }
           
            
        }
        else{
            try {
             const response = await AttendanceService.createAttendance(CreateAttendacePayload)
            console.log("Attendance created successfully!",response);
            toast.success("Attendance created successfully!");
            } catch (error) {
                console.error("Failed to create Attendance");
                toast.error("Failed to create Attendance");               
            }      
        }
        fetchAttendance();
        setEditingId(0);
        setIsOpen(false);
        resetForm();
        
    }

   const resetForm = () => {
        setTimeIn(""),
        setTimeOut("");
    }

    const handleEdit = async () => {
        
    }
    return{
        attendance,
        employeeId,
        date,
        timeIn,
        timeOut,
        employeeName,
        totalHours,

        isEditMode,
    setIsEditMode,
    editingId,
    setEditingId,
    isOpen,
    setIsOpen,

    handleSubmit,
    handleEdit,
    handleAddButton,
    handleDelete
    }
}
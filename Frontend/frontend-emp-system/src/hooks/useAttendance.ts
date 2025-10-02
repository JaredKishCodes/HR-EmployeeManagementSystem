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
   //handle submit form
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateAttendacePayload = {
            timeOut
        }

         const CreateAttendacePayload = {
            employeeId : 2,
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
    //reset Form
   const resetForm = () => {
        setTimeIn(""),
        setTimeOut("");
    }
    //handle edit form
    const handleEdit = async (id:number) => {
        const attendance = await AttendanceService.getAttendance(id);

        if(attendance){
            setTimeIn(attendance.timeIn);
            setTimeOut(attendance.timeOut);
        }

        setIsOpen(true);
        setEditingId(id);
        setIsEditMode(true);   
    }

    //create attendance form

    const handleAddButton = () =>{
        setIsOpen(true);
        setEditingId(0);
        setIsEditMode(false);
        resetForm();
    }

    //Delete attendance form
    const handleDelete = async (id:number) => {
      const result =  window.confirm("Are you sure you want to delete?");

      if(result){
        try {
            const response = await AttendanceService.deleteAttendance(id);
            console.log("Attendance deleted successfully",response);
            toast.success("Attendance deleted successfully");
            

        } catch (error) {
            toast.error("Error deleting attendance")
        }   
      }
    }

    return{
        attendance,
        employeeId,
        date,
        timeIn,
        setTimeIn,
        timeOut,
        setTimeOut,
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
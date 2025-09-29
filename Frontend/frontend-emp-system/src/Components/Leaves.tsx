import axios from 'axios';
import React, { useEffect, useState } from 'react'
import type { LeaveRequest } from '../Types/leaves';

type Props = {}

const Leaves = (props: Props) => {

   const API_URL = "https://localhost:7273";

  const [isOpen , setIsOpen] = useState(false)
  const[editingId, setEditingId] = useState(0);
  const[editMode,setEditMode] = useState(false)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const[leaveType,setLeaveType] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate,setEndDate]= useState("");
  const[reason,setReason] = useState("");
  const[leaveRequestStatus, setLeaveRequestStatus] = useState("");
  const[createdAt,setCreatedAt] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  useEffect(()=>{
    fetchLeaveRequests();
  },[])


  const fetchLeaveRequests = async () =>{

    try{
       const response = await axios.get(`${API_URL}/api/LeaveRequest/GetAllLeaveRequests`);
       console.log("Leave Requests fetched successfully",response.data);
        setLeaveRequests(response.data);
    }
    catch(error){
      console.error("Error fetching leaveRequests", error)
    }
   

  }

  const handleEdit = async (id:number)=> {
    setIsOpen(true);
    setEditMode(true);
    setEditingId(id);

    const response = await axios.put(`${API_URL}/api/LeaveRequest/${editingId}`)
    console.log("Leave Requests updated successfully",response.data);

   const leaveRequest = response.data

   if(leaveRequest){
    leaveRequest.leaveType;
    leaveRequest.startDate;
    leaveRequest.endDate;
    leaveRequest.reason;
    leaveRequest.leaveRequestStatus;
    leaveRequest.approvedBy;
   }
        
  }

  const handleAddButton = ()=>{
    setIsOpen(true);
  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const leaveRequest = {
      leaveType,
      startDate,
      endDate,
      reason,
      leaveRequestStatus,
      approvedBy

    }

    try {
      if(editMode && editingId){
        con
      }
      
    } catch (error) {
      
    }
  }


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
     
  

        <button onClick={handleAddButton}   type="button" className=" mb-5 m-5 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                 Add New</button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Id
              </th>
              <th scope="col" className="px-6 py-3">
                Leave Type
              </th>
              <th scope="col" className="px-6 py-3">
               Start Date
              </th>
              <th scope="col" className="px-6 py-3">
               End Date
              </th>
               <th scope="col" className="px-6 py-3">
               Reason
              </th>
              <th scope="col" className="px-6 py-3">
               Leave Request Status
              </th>
              <th scope="col" className="px-6 py-3">
              Created At
              </th>
              <th scope="col" className="px-6 py-3">
              Approved By
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
              
            </tr>
          </thead>
           
              <tbody>
                {leaveRequests.map((leaveRequest)=>(
            <tr  key={leaveRequest.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-table-search-1"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {leaveRequest.employeeId}
              </th>
              <td className="px-6 py-4">{leaveRequest.leaveType}</td>
              <td className="px-6 py-4">{leaveRequest.startDate ? new Date(leaveRequest.startDate).toLocaleDateString() : ""}</td>
              <td className="px-6 py-4">{leaveRequest.endDate ? new Date(leaveRequest.endDate).toLocaleDateString() : ""}</td>
              <td className="px-6 py-4">{leaveRequest.reason}</td>
              <td className="px-6 py-4">{leaveRequest.leaveRequestStatus}</td>
              <td className="px-6 py-4">{leaveRequest.createdAt ? new Date(leaveRequest.createdAt).toLocaleDateString() : ""}</td>
              <td className="px-6 py-4">{leaveRequest.approvedBy}</td>
             
              <td className=" pl-7 py-4">
                <a
                  onClick={()=> handleEdit(leaveRequest.id)}
                  className=" cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td className="pr-7 py-4">
                <a
                 
                  className=" cursor-pointer font-medium text-red-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
            ))}
          </tbody>     
      
          
                 
              
            
          
        </table>

        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            {/* ... more pagination items ... */}
          </ul>
        </nav>
      </div>

                 {/* Main modal */}
       {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full ">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
          
            className="relative p-4 w-full max-w-md max-h-full"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editMode && editingId ? "Edit leave request": "Create leave request"}
                </h3>
                <button
                  type="button"
                  onClick={()=>setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <form onClick={handleSubmit} className="p-4 md:p-5" >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Leave Type
                    </label>
                    <input
                    value={leaveType}
                     onChange={(e)=> setLeaveType(e.target.value)}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Type department name"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                    <div className="col-span-1">
                    <label
                  
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Start Date
                    </label>
                    <input  value={startDate} onChange={(e)=> setStartDate(e.target.value)} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>

                     <div className="col-span-1">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        End Date
                    </label>
                    <input value={endDate}  onChange={(e)=> setEndDate(e.target.value)} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>

                     <div className="col-span-2">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Reason
                    </label>
                    <textarea value={reason}   onChange={(e)=> setReason(e.target.value)} rows={3}   className="bg-gray-50 border w-[370px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>


                  
                </div>
                <button
                  type="submit"
                  className=" cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                 {editMode && editingId ? "Update leave request": "Create leave request"}
                </button>
              </form>
            </div>
          </div>
        </div>
       )}

    </div>

  )
}

export default Leaves
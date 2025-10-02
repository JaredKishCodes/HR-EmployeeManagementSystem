
import React from 'react'
import { useAttendance } from '../hooks/useAttendance'

type Props = {}

const Attendance = (props: Props) => {

  const{attendance,employeeId,date,timeIn,setTimeIn,timeOut,setTimeOut,employeeName,totalHours, isEditMode,
    setIsEditMode,
    editingId,
    setEditingId,
    isOpen,
    setIsOpen,

    handleSubmit,
    handleEdit,
    handleAddButton,
    handleDelete} = useAttendance();
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
                Id 
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Id
              </th>
              <th scope="col" className="px-6 py-3">
               Employee Name
              </th>
               <th scope="col" className="px-6 py-3">
               Date
              </th>
              <th scope="col" className="px-6 py-3">
               Time In
              </th>
              <th scope="col" className="px-6 py-3">
               Time Out
              </th>
              <th scope="col" className="px-6 py-3">
               Total Hours
              </th>
              <th scope="col" className="px-6 py-3">
               Attendance Status
              </th>
              <th scope="col" className="px-6 py-3">
               Action
              </th>
              
            </tr>
          </thead>
            {attendance.map(attendance =>(
                   <tbody key={attendance.id}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
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
            {attendance.id}
              </th>
              <td className="px-6 py-4">{attendance.employeeId}</td>
              <td className="px-6 py-4">{attendance.employeeName} </td>
              <td className="px-6 py-4">{attendance.date}</td>
              <td className="px-6 py-4">{attendance.timeIn}</td>
              <td className="px-6 py-4">{attendance.timeOut}</td>
              <td className="px-6 py-4">{attendance.totalHours}</td>
              <td className="px-6 py-4">{attendance.attendanceStatus}</td>
              
             
              <td className=" pl-7 py-4">
                <a
                    onClick={()=>handleEdit(attendance.id)}
                  className=" cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td className="pr-7 py-4">
                <a
                  onClick={()=> handleDelete(attendance.id)}
                  className=" cursor-pointer font-medium text-red-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
           
          </tbody>     
            ))}
              
            
          
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
                  {isEditMode && editingId ? "Edit attendance" : "Add new attendance"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
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
              { isEditMode ? 
                ( <form  onSubmit={handleSubmit} className="p-4 md:p-5" >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="timeOut"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time Out
                    </label>
                    <input
                      value={timeOut}
                      onChange={(e)=>setTimeOut(e.target.value)}
                      type="datetime-local"
                      name="timeOut"
                      id="timeOut"                 
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
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
                   Update attendance
                </button>
              </form> ) : (<form  onSubmit={handleSubmit} className="p-4 md:p-5" >
                  <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="timeIn"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time In
                    </label>
                    <input
                      value={timeIn}
                      onChange={(e)=>setTimeIn(e.target.value)}
                      type="datetime-local"
                      name="timeIn"
                      id="timeIn"                 
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
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
                   Set Time In
                </button>
                </form> 
                )}
                
              
               
              
              
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Attendance
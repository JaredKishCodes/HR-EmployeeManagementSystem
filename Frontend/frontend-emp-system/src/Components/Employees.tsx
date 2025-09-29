import { useEffect, useState, type FC } from "react";
import type {  JSX,  } from "react";
import type { EmployeeResponse } from "../Types/employee";
import axios from "axios";
import { toast } from "react-toastify";

const Employees: FC = (): JSX.Element => {
  const API_URL = "https://localhost:7273";


  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [departmentId, setDepartmentId] = useState< string>("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
   
    fetchEmployees();

  }, [])

   const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Employee/GetAllEmployees`);
        setEmployees(response.data);
      }
      catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const employee ={
      firstName,
      lastName,
      email,
      phoneNumber,
      position,
      status,
      hireDate,
      departmentId : Number(departmentId)

    }

    try{  
      if(editingId && isEditMode){
        const response = await axios.put(`${API_URL}/api/Employee/${editingId}`,employee)
        console.log("Employee updated", response);
        toast.success("Employee updated successfully!")
      }
      else{
         const response = await axios.post(`${API_URL}/api/Employee`,employee);

      console.log("Data sent successfully", response)
      toast.success("Employee added successfully!")

      }
     
      fetchEmployees();
      setIsOpen(false);
      setEditingId(0);
      resetForm();
    }
    catch(err){
      console.error("Error sending data",err)
      toast.error("Error sending data")
    }
  }

   const handleEdit = async (id:number) =>{

    const response = await axios.get(`${API_URL}/api/Employee/${id}`);

    const employee = response.data

    if (employee){
      setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setphoneNumber(employee.phoneNumber);
    setPosition(employee.position);
    setStatus(employee.status);
    setHireDate(employee.hireDate.split("T")[0]);
    setDepartmentId(employee.departmentId?.toString() ?? "");
    }

    setIsEditMode(true);
    setEditingId(id);
    setIsOpen(true);



  }

  const handleAddButton = () => {
    setIsEditMode(false);
    setEditingId(0);
    setIsOpen(true);
    resetForm();
  }

  const handleDelete =  async (id:number) => {
   const result = confirm("Are you sure you want to delete this employee?")

   if(result){
      try {
      const response = await axios.delete(`${API_URL}/api/Employee/${id}`);
      toast.success("Employee deleted successfully", response.data);
      fetchEmployees(); 
    } catch (err) {
      toast.error("Failed to delete employee:");
    }
  }

  }

  const resetForm = () =>{
    setFirstName("");
  setLastName("");
  setEmail("");
  setphoneNumber("");
  setPosition("");
  setStatus("");
  setHireDate("");
  setDepartmentId("");
  setIsEditMode(false);
  setEditingId(null);
  }



  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
     
  

        <button  onClick={handleAddButton} type="button" className=" mb-5 m-5 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                HireDate
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {employees.map(emp => (
                  <tbody key={emp.id}>
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
                {emp.firstName} <span>{emp.lastName}</span>
              </th>
              <td className="px-6 py-4">{emp.email}</td>
              <td className="px-6 py-4">{emp.phoneNumber}</td>
              <td className="px-6 py-4">{emp.position}</td>
              <td className="px-6 py-4">{emp.hireDate}</td>
              <td className="px-6 py-4">{emp.status}</td>
              <td className="px-6 py-4">{emp.departmentName}</td>
              <td className=" pl-7 py-4">
                <a
                  onClick={()=> handleEdit(emp.id)}
                  className=" cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td className="pr-7 py-4">
                <a
                  onClick={()=> handleDelete(emp.id)}
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
                 {editingId ? "Edit employee": "Add new employee"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
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
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Type first name"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Last Name
                    </label>
                    <input
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Type last name"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                    value={email}
                     onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      name="email"
                      id="email"
                      placeholder="example@gmail.com"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input  value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} type="number" name="phoneNumber" id="phoneNumber" placeholder="112233" required
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="position"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Position
                    </label>
                    
                    <select value={position} onChange={(e) => setPosition(e.target.value)} name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="Manager">Manager</option>
                      <option value="AssistantManager">Assistant Manager</option>
                      <option value="TeamLeader">Team Leader</option>
                      <option value="Staff">Staff</option>
                      <option value="Intern">Intern</option>
                    </select>
                           
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    
                    <select  value={status} onChange={(e) => setStatus(e.target.value)}  name="status" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="OnLeave">On Leave</option>        
                      <option value="Terminated">Terminated</option>
                    </select>
                           
                  </div>

                   <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hire Date
                    </label>
                    <input  value={hireDate} onChange={(e) => setHireDate(e.target.value)}  type="Date" name="hireDate" id="hireDate" required
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="departmentId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <input value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} type="text" name="departmentId" id="departmentId" placeholder="type a department" required
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
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
                  {editingId ? "Update Employee" : "Add Employee"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>

    
  );

  
};

export default Employees;

import type { FC, JSX } from "react";
import { useEmployees } from "../../hooks/useEmployees";
import { Position } from "../../Types/enums";

const Employees: FC = (): JSX.Element => {
  const positionMap: Record<number, string> = {
    0: "Manager",
    1: "Assistant Manager",
    2: "Team Leader",
    3: "Staff",
    4: "Intern",
  };

  const statusMap: Record<number, string> = {
    0: "Active",
    1: "Inactive ",
    2: "Team Leader",
    3: "OnLeave",
    4: "Terminated",
  };

  const {
    employees,
    setEmployees,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    position,
    setPosition,
    status,
    setStatus,
    hireDate,
    setHireDate,
    departmentId,
    setDepartmentId,
    departments,
    setDepartments,

    isEditMode,
    setIsEditMode,
    editingId,
    setEditingId,
    isOpen,
    setIsOpen,

    handleSubmit,
    handleEdit,
    handleAddButton,
    handleDelete,
  } = useEmployees();
  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <button
          onClick={handleAddButton}
          type="button"
          className="m-5 me-2 mb-5 cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add New
        </button>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
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
          {employees.map((emp) => (
            <tbody key={emp.id}>
              <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
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
                  className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {emp.firstName} <span>{emp.lastName}</span>
                </th>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.phoneNumber}</td>
                <td className="px-6 py-4">
                  {positionMap[Number(emp.position)]}
                </td>
                <td className="px-6 py-4">{emp.hireDate}</td>
                <td className="px-6 py-4">{statusMap[Number(emp.status)]}</td>
                <td className="px-6 py-4">{emp.departmentName}</td>
                <td className="py-4 pl-7">
                  <a
                    onClick={() => handleEdit(emp.id)}
                    className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </td>
                <td className="py-4 pr-7">
                  <a
                    onClick={() => handleDelete(emp.id)}
                    className="cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <nav
          className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
          aria-label="Table navigation"
        >
          <span className="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="relative max-h-full w-full max-w-md p-4"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            {/* Modal content */}
            <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingId ? "Edit employee" : "Add new employee"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
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
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Type first name"
                      required
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@gmail.com"
                      required
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="112233"
                      required
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="position"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Position
                    </label>

                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      name="position"
                      id="position"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    >
                      <option value="Manager">Manager</option>
                      <option value="AssistantManager">
                        Assistant Manager
                      </option>
                      <option value="TeamLeader">Team Leader</option>
                      <option value="Staff">Staff</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      id="status"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="OnLeave">On Leave</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hire Date
                    </label>
                    <input
                      value={hireDate}
                      onChange={(e) => setHireDate(e.target.value)}
                      type="Date"
                      name="hireDate"
                      id="hireDate"
                      required
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="departmentId"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>

                    <select
                      id="departmentId"
                      name="departmentId"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      required
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="-ms-1 me-1 h-5 w-5"
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

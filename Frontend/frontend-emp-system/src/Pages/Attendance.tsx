import React from "react";
import { useAttendance } from "../hooks/useAttendance";

type Props = {};

const Attendance = (props: Props) => {
  const attendanceStatusMap: Record<number, string> = {
    0: "Present",
    1: "Late",
    2: "Overtime",
  };
  const {
    attendance,
    employeeId,
    date,
    timeIn,
    setTimeIn,
    timeOut,
    setTimeOut,
    employeeFirstName,
    setEmployeeFirstName,
    setEmployeeLastName,
    employeeLastName,
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
    handleDelete,
  } = useAttendance();
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
          {attendance.map((attendance) => (
            <tbody key={attendance.id}>
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
                  {attendance.id}
                </th>
                <td className="px-6 py-4">{attendance.employeeId}</td>
                <td className="px-6 py-4">
                  {attendance.employeeFirstName}{" "}
                  <span>{attendance.employeeLastName} </span>{" "}
                </td>
                <td className="px-6 py-4">{" "}
                  {new Date(attendance.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    
                  })}</td>
                <td className="px-6 py-4">
                  {" "}
                  {new Date(attendance.timeIn).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {new Date(attendance.timeOut).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4">{attendance.totalHours} hours</td>
                <td className="px-6 py-4">
                  {attendanceStatusMap[Number(attendance.attendanceStatus)]}
                </td>

                <td className="py-4 pl-7">
                  <a
                    onClick={() => handleEdit(attendance.id)}
                    className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </td>
                <td className="py-4 pr-7">
                  <a
                    onClick={() => handleDelete(attendance.id)}
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
              100
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
                  {isEditMode && editingId
                    ? "Edit attendance"
                    : "Add new attendance"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="h-3 w-3 cursor-pointer"
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
              {isEditMode ? (
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="timeOut"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Time Out
                      </label>
                      <input
                        value={timeOut}
                        onChange={(e) => setTimeOut(e.target.value)}
                        type="datetime-local"
                        name="timeOut"
                        id="timeOut"
                        required
                        className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
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
                    Update attendance
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="timeIn"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Time In
                      </label>
                      <input
                        value={timeIn}
                        onChange={(e) => setTimeIn(e.target.value)}
                        type="datetime-local"
                        name="timeIn"
                        id="timeIn"
                        required
                        className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
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
                    Set Time In
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;

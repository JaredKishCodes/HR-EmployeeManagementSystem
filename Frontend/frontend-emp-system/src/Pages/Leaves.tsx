import React, { useEffect, useState } from "react";
import { LeaveRequestStatus, type LeaveRequest } from "../Types/leaves";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Leaves = () => {
  // Converts number from API → string for UI
  const LeaveRequestStatusReverseMap: Record<number, string> = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
  };

  // Converts string from UI → number for API
  const LeaveRequestStatusApiMap: Record<string, number> = {
    Pending: 0,
    Approved: 1,
    Rejected: 2,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveRequestStatus, setLeaveRequestStatus] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  useEffect(() => {
    if (role === "Admin") {
      fetchLeaveRequests();
    }
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await api.get(`/LeaveRequest/GetAllLeaveRequests`);
      console.log("Leave Requests fetched successfully", response.data);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leaveRequests", error);
    }
  };

  const handleEdit = async (id: number) => {
    setIsOpen(true);
    setEditMode(true);
    setEditingId(id);

    const response = await api.get(`/LeaveRequest/${id}`);
    console.log("Leave Requests updated successfully", response.data);

    const leaveRequest = response.data;

    if (leaveRequest) {
      setLeaveType(leaveRequest.leaveType);
      setStartDate(leaveRequest.startDate);
      setEndDate(leaveRequest.endDate);
      setReason(leaveRequest.reason);
      setLeaveRequestStatus(
        LeaveRequestStatusReverseMap[leaveRequest.leaveRequestStatus],
      );

      setApprovedBy(leaveRequest.approvedBy);
    }
  };

  const handleAddButton = () => {
    setIsOpen(true);
    setEditMode(false);
    setEditingId(0);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanStartDate = new Date(startDate).toISOString();
    const cleanEndDate = new Date(endDate).toISOString();

    const createLeaveRequest = {
      employeeId: employeeId,
      leaveType: leaveTypeApiMap[leaveType],
      startDate: cleanStartDate,
      endDate: cleanEndDate,
      reason,
    };

    const editLeaveRequest = {
      employeeId: employeeId,
      leaveType,
      startDate: cleanStartDate,
      leaveRequestStatus: LeaveRequestStatusApiMap[leaveRequestStatus],
      approvedBy: 1,
      endDate: cleanEndDate,
      reason,
    };

    if (editMode && editingId) {
      console.log(editLeaveRequest);
      const response = await api.put(
        `/LeaveRequest/${editingId}`,
        editLeaveRequest,
      );
      fetchLeaveRequests();
      console.log("Leave Requests updated successfully", response.data);
      toast.success("Leave Requests updated successfully");
    } else {
      try {
        console.log(createLeaveRequest);

        const response = await api.post(
          `/LeaveRequest/CreateLeaveRequest`,
          createLeaveRequest,
        );
        fetchLeaveRequests();
        console.log("Leave Requests created successfully", response.data);
        toast.success("Leave Requests created successfully");
      } catch (error) {
        console.error("Failed to create attendance", error);
        toast.error("Failed to create attendance");
      }
    }

    setIsOpen(false);
    fetchLeaveRequests();
    setEditMode(false);
    setEditingId(0);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    const result = window.confirm(
      "Are you sure you want to delete leaveRequest?",
    );

    if (result) {
      try {
        const response = await api.delete(`/LeaveRequest/${id}`);
        console.log("Leave Request deleted successfully", response.data);
        toast.success("Leave Request deleted successfully");
      } catch (error) {
        console.error("Failed to delete leaveRequest", error);
      }
    }
  };

  const getLeaveRequestsByEmployeeId = async (employeeId: number) => {
    const response = await api.get(
      `/LeaveRequest/getLeaveRequestByEmployeeId/${employeeId}`,
    );
    setLeaveRequests(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (role != "Admin" && employeeId) {
      getLeaveRequestsByEmployeeId(Number(employeeId ?? 0));
    }
  }, []);

  const resetForm = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const leaveTypeMap: Record<number, string> = {
    0: "Vacation",
    1: "Sick",
    2: "Emergency",
    3: "Maternity",
    4: "Paternity",
    5: "Parental",
    6: "Bereavement",
    7: " Holiday",
    8: "Study",
    9: "Unpaid",
  };

  const leaveTypeApiMap: Record<string, number> = {
    Vacation: 0,
    Sick: 1,
    Emergency: 2,
    Maternity: 3,
    Paternity: 4,
    Parental: 5,
    Bereavement: 6,
    Holiday: 7,
    Study: 8,
    Unpaid: 9,
  };

  const leaveRequestMap: Record<number, string> = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
  };

  const approvedByMap: Record<number, string> = {
    0: "Pending",
    1: "Manager",
    2: "Assistant Manager",
    3: "Team Leader",
  };

  const role = localStorage.getItem("role");
  const employeeId = Number(localStorage.getItem("employeeId"));

  return (
    <div>
      {role == "Admin" ? (
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
                  Employee Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Employee Name
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
              {leaveRequests.map((leaveRequest) => (
                <tr
                  key={leaveRequest.id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
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
                    {leaveRequest.employeeId}
                  </th>
                  <td className="px-6 py-4">
                    {leaveRequest.employeeFirstName}{" "}
                    <span>{leaveRequest.employeeLastName}</span>
                  </td>
                  <td className="px-6 py-4">
                    {leaveTypeMap[Number(leaveRequest.leaveType)]}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.startDate
                      ? new Date(leaveRequest.startDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.endDate
                      ? new Date(leaveRequest.endDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">{leaveRequest.reason}</td>
                  <td className="px-6 py-4">
                    {leaveRequestMap[Number(leaveRequest.leaveRequestStatus)]}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.createdAt
                      ? new Date(leaveRequest.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {approvedByMap[Number(leaveRequest.approvedBy)]}
                  </td>

                  <td className="py-4 pl-7">
                    <a
                      onClick={() => handleEdit(leaveRequest.id)}
                      className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="py-4 pr-7">
                    <a
                      onClick={() => handleDelete(leaveRequest.id)}
                      className="cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
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
      ) : (
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
                  Employee Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Employee Name
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
              {leaveRequests.map((leaveRequest) => (
                <tr
                  key={leaveRequest.id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
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
                    {leaveRequest.employeeId}
                  </th>
                  <td className="px-6 py-4">
                    {leaveRequest.employeeFirstName}{" "}
                    <span>{leaveRequest.employeeLastName}</span>
                  </td>
                  <td className="px-6 py-4">
                    {leaveTypeMap[Number(leaveRequest.leaveType)]}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.startDate
                      ? new Date(leaveRequest.startDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.endDate
                      ? new Date(leaveRequest.endDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">{leaveRequest.reason}</td>
                  <td className="px-6 py-4">
                    {leaveRequestMap[Number(leaveRequest.leaveRequestStatus)]}
                  </td>
                  <td className="px-6 py-4">
                    {leaveRequest.createdAt
                      ? new Date(leaveRequest.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {approvedByMap[Number(leaveRequest.approvedBy)]}
                  </td>

                  <td className="py-4 pl-7">
                    <a
                      onClick={() => handleEdit(leaveRequest.id)}
                      className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="py-4 pr-7">
                    <a
                      onClick={() => handleDelete(leaveRequest.id)}
                      className="cursor-pointer font-medium text-red-600 hover:underline dark:text-blue-500"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
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
      )}

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
                  {editMode && editingId
                    ? "Edit leave request"
                    : "Create leave request"}
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
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="leaveType"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Leave Type
                    </label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      name="leaveType"
                      id="leaveType"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    >
                      <option value="" disabled>
                        Select a leave type
                      </option>
                      <option value="Vacation">Vacation</option>
                      <option value="Sick">Sick</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Paternity">Paternity</option>
                      <option value="Parental">Parental</option>
                      <option value="Bereavement">Bereavement</option>
                      <option value="Holiday">Holiday</option>
                      <option value="Study">Study</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Date
                    </label>
                    <input
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Reason
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-[370px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                {editMode ? (
                  <select
                    name="leaveRequestStatus"
                    id="leaveRequestStatus"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    value={leaveRequestStatus}
                    onChange={(e) => setLeaveRequestStatus(e.target.value)}
                  >
                    <option value="">-- Select Status --</option>
                    {Object.values(LeaveRequestStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  className="mt-6 inline-flex cursor-pointer items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  {editMode && editingId
                    ? "Update leave request"
                    : "Create leave request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;

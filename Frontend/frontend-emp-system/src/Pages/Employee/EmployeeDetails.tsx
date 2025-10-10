import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const EmployeeDetails = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7273/api/Employee/${id}`)
      .then((res) => setEmployee(res.data));
  }, [id]);

  if (!employee) {
    return (
      <div className="mt-20 text-center text-lg text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-gray-100 px-4">
      <div className="mb-30 w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        {/* Header */}
        <h1 className="mb-6 text-center text-2xl font-bold text-indigo-600">
          Employee Details
        </h1>

        {/* Profile Section */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-600">
            {employee.firstName?.charAt(0)}
            {employee.lastName?.charAt(0)}
          </div>
          <h2 className="mt-3 text-lg font-semibold">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-gray-500">{employee.position}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{employee.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{employee.phoneNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Hire Date</span>
            <span className="font-medium">
              {new Date(employee.hireDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Status</span>
            <span
              className={`font-medium ${
                employee.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {employee.status}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Department</span>
            <span className="font-medium">
              {employee.departmentName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Salary</span>
            <span className="font-medium">
              {employee.salary ? `₱${employee.salary}` : "Not Assigned"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

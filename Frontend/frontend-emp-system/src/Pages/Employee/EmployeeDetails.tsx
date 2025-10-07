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
    return <div className="mt-10 text-center text-gray-500">Loading...</div>;
  }
  return (
    <div className="mt-10 flex min-h-screen flex-col items-center ">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-10 text-center text-3xl font-bold">
          Employee Details
        </h1>

        <div className="space-y-2 text-center">
          <div>
            Employee Name: {employee.firstName} {employee.lastName}
          </div>
          <div>Email Address: {employee.email}</div>
          <div>Phone Number: {employee.phoneNumber}</div>
          <div>Position: {employee.position}</div>
          <div>Hired Date: {employee.hireDate}</div>
          <div>Employee Status: {employee.status}</div>
          <div>Department Name: {employee.departmentName}</div>
          <div>Employee Salary: {employee.salary}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

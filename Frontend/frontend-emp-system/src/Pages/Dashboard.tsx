import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      Welcome to Dashboard!
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-blue-500 p-4 text-white shadow">
          Total Employees: 42
        </div>
        <div className="rounded-lg bg-green-500 p-4 text-white shadow">
          Present Today: 37
        </div>
        <div className="rounded-lg bg-yellow-500 p-4 text-white shadow">
          Pending Leaves: 3
        </div>
        <div className="rounded-lg bg-purple-500 p-4 text-white shadow">
          Monthly Payroll: ₱320,000
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✔️ Payroll processed for September</li>
          <li>📝 John Cruz submitted a leave request</li>
          <li>👤 Maria Santos added to Marketing</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

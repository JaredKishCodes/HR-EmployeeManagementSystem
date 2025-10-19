import { FaUsers, FaUserCheck, FaClock, FaMoneyBillWave } from 'react-icons/fa';




const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Welcome to Dashboard!
      </h1>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex items-center gap-4 rounded-lg bg-blue-500 p-4 text-white shadow transition hover:bg-blue-600">
          <FaUsers size={30} />
          <div>
            <p className="text-sm">Total Employees</p>
            <p className="text-xl font-bold">42</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-green-500 p-4 text-white shadow transition hover:bg-green-600">
          <FaUserCheck size={30} />
          <div>
            <p className="text-sm">Present Today</p>
            <p className="text-xl font-bold">37</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-yellow-500 p-4 text-white shadow transition hover:bg-yellow-600">
          <FaClock size={30} />
          <div>
            <p className="text-sm">Pending Leaves</p>
            <p className="text-xl font-bold">3</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg bg-purple-500 p-4 text-white shadow transition hover:bg-purple-600">
          <FaMoneyBillWave size={30} />
          <div>
            <p className="text-sm">Monthly Payroll</p>
            <p className="text-xl font-bold">₱320,000</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            ✔️ Payroll processed for September
          </li>
          <li className="flex items-center gap-2">
            📝 John Cruz submitted a leave request
          </li>
          <li className="flex items-center gap-2">
            👤 Maria Santos added to Marketing
          </li>
        </ul>
      </div>

     
     
    </div>
  );
};

export default Dashboard;

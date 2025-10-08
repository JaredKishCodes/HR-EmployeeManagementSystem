import { ToastContainer } from "react-toastify";
import Employees from "./Pages/Employee/Employees";
import Layout from "./Pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./Pages/Department";
import Dashboard from "./Pages/Dashboard";
import Leaves from "./Pages/Leaves";
import Attendance from "./Pages/Attendance";
import Payroll from "./Pages/Payroll";
import EmployeeDetails from "./Pages/Employee/EmployeeDetails";
import Login from "./Pages/Login";

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Employees />} /> {/* Loads on "/" */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="department" element={<Department />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </Router>
  );
}

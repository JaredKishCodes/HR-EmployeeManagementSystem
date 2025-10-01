import { ToastContainer } from "react-toastify";
import Employees from "./Pages/Employee/Employees";
import Layout from "./Pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./Pages/Department";
import Dashboard from "./Pages/Dashboard";
import Leaves from "./Pages/Leaves";

export default function App() {


  return (
   <Router>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      
      <Route path="/" element={<Layout/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="employees" element ={<Employees/>}/>
        <Route path="department" element = {<Department/>}/>
        <Route path='leaves' element = {<Leaves/>}/>
        
      </Route>
    </Routes>
   </Router>
   
  );
}

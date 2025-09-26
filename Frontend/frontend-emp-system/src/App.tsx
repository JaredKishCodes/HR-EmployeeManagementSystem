import { ToastContainer } from "react-toastify";
import Employees from "./Components/Employees";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./Components/Department";
import Dashboard from "./Components/Dashboard";

export default function App() {


  return (
   <Router>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      
      <Route path="/" element={<Layout/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="employees" element ={<Employees/>}/>
        <Route path="department" element = {<Department/>}/>
        
      </Route>
    </Routes>
   </Router>
   
  );
}

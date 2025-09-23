import Employees from "./Components/Employees";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {


  return (
   <Router>
    <Routes>
      
      <Route path="/" element={<Layout/>}>
       
        <Route path="employees" element ={<Employees/>}/>
      </Route>
    </Routes>
   </Router>
  );
}

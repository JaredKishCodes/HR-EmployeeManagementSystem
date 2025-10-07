import { all } from "axios";
import { usePayroll } from "../hooks/usePayroll";

const Payroll = () => {
  const {
    departmentId,
    setDepartmentId,
    departments,
    employeeId,
    setEmployeeId,
    employees,
    basicSalary,
    setBasicSalary,
    deductions,
    setDeductions,
    allowances,
    setAllowances,
    payDate,
    setPayDate,
    onSubmitPayroll,
    selectedDepartment,
    setSelectedDepartment,
    handleDepartmentChange
  } = usePayroll();

  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded">
        <h1 className="text-3xl font-bold mb-10 text-center">Add New Salary</h1>

        <form className="w-full" onSubmit={(e) => { e.preventDefault(); onSubmitPayroll(); }}>
          {/* FIRST ROW */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Department */}
            <div className="flex flex-col">
              <label htmlFor="departmentId" className="mb-2 font-medium text-gray-900 dark:text-white">
                Department
              </label>
              <select
                id="departmentId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={ handleDepartmentChange}
                value={selectedDepartment}

              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option value={dept.id} key={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div className="flex flex-col">
              <label htmlFor="employeeId" className="mb-2 font-medium text-gray-900 dark:text-white">
                Employee
              </label>
              <select
              disabled={!selectedDepartment}
                id="employeeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-3"
                onChange={(e) => setEmployeeId(Number(e.target.value))}
                value={employeeId}
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div className="flex flex-col">
              <label htmlFor="basicSalary" className="mb-2 font-medium text-gray-900 dark:text-white">
                Basic Salary
              </label>
              <input
                type="number"
                id="basicSalary"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-3"
                placeholder="0"
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                value={basicSalary}
              />
            </div>
          </div>

          {/* SECOND ROW */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Allowances */}
            <div className="flex flex-col">
              <label htmlFor="allowances" className="mb-2 font-medium text-gray-900 dark:text-white">
                Allowances
              </label>
              <input
                type="number"
                id="allowances"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-3"
                placeholder="0"
                onChange={(e) => setAllowances(Number(e.target.value))}
                value={allowances}
              />
            </div>

            {/* Deductions */}
            <div className="flex flex-col">
              <label htmlFor="deductions" className="mb-2 font-medium text-gray-900 dark:text-white">
                Deductions
              </label>
              <input
                type="number"
                id="deductions"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-3"
                placeholder="0"
                onChange={(e) => setDeductions(Number(e.target.value))}
                value={deductions}
              />
            </div>

            {/* Pay Date */}
            <div className="flex flex-col">
              <label htmlFor="payDate" className="mb-2 font-medium text-gray-900 dark:text-white">
                Pay Date
              </label>
              <input
                type="date"
                id="payDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-3"
                onChange={(e) => setPayDate(e.target.value)}
                value={payDate}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 cursor-pointer text-white text-xl font-bold rounded px-10 py-2 hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payroll;

import { all } from "axios";
import { usePayroll } from "../hooks/usePayroll";

const Payroll = () => {
  const {
    role,
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
    handleDepartmentChange,
  } = usePayroll();

  return (
    <div>
      {role === "Admin" ? (
        <div className="relative overflow-x-auto sm:rounded">
          <h1 className="mb-10 text-center text-3xl font-bold">
            Add New Salary
          </h1>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitPayroll();
            }}
          >
            {/* FIRST ROW */}
            <div className="mb-8 grid grid-cols-3 gap-8">
              {/* Department */}
              <div className="flex flex-col">
                <label
                  htmlFor="departmentId"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  id="departmentId"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handleDepartmentChange}
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
                <label
                  htmlFor="employeeId"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Employee
                </label>
                <select
                  disabled={!selectedDepartment}
                  id="employeeId"
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
                <label
                  htmlFor="basicSalary"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  id="basicSalary"
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0"
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  value={basicSalary}
                />
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="mb-8 grid grid-cols-3 gap-8">
              {/* Allowances */}
              <div className="flex flex-col">
                <label
                  htmlFor="allowances"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  id="allowances"
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0"
                  onChange={(e) => setAllowances(Number(e.target.value))}
                  value={allowances}
                />
              </div>

              {/* Deductions */}
              <div className="flex flex-col">
                <label
                  htmlFor="deductions"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  id="deductions"
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0"
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  value={deductions}
                />
              </div>

              {/* Pay Date */}
              <div className="flex flex-col">
                <label
                  htmlFor="payDate"
                  className="mb-2 font-medium text-gray-900 dark:text-white"
                >
                  Pay Date
                </label>
                <input
                  type="date"
                  id="payDate"
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setPayDate(e.target.value)}
                  value={payDate}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="cursor-pointer rounded bg-blue-600 px-10 py-2 text-xl font-bold text-white transition hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {role === "Employee" ? (
        <div className="rounded-lg bg-white p-4 shadow-lg dark:border-gray-700">
          <div>
            <div className="relative overflow-x-auto sm:rounded-lg">
              {/* Table */}
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
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Employee Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Basic Salary
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Allowances
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Deductions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pay Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Hours
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Salary
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>

              {/* Pagination */}
              <nav
                className="flex flex-wrap items-center justify-between pt-4 md:flex-row"
                aria-label="Table navigation"
              >
                <span className="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    100
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
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Payroll;



const Payroll = () => {
  return (
    <div className='bg-slate-50 rounded p-10 min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-6xl'>
        <h1 className='text-3xl font-bold mb-10 text-center'>Add New Salary</h1>

        <form className="w-full">
          <div className='grid grid-cols-3 gap-8 mb-8'>
            {/* Department */}
            <div className="flex flex-col">
              <label htmlFor="departmentId" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Department
              </label>
              <input
                type="text"
                id="departmentId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
                placeholder="Department ID"
              />
            </div>

            {/* Employee */}
            <div className="flex flex-col">
              <label htmlFor="employeeId" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Employee
              </label>
              <input
                type="text"
                id="employeeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
                placeholder="Employee ID"
              />
            </div>

            {/* Basic Salary */}
            <div className="flex flex-col">
              <label htmlFor="basicSalary" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Basic Salary
              </label>
              <input
                type="number"
                id="basicSalary"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
                placeholder="0"
              />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-8 mb-8'>
            {/* Allowances */}
            <div className="flex flex-col">
              <label htmlFor="allowances" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Allowances
              </label>
              <input
                type="number"
                id="allowances"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
                placeholder="0"
              />
            </div>

            {/* Deductions */}
            <div className="flex flex-col">
              <label htmlFor="deductions" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Deductions
              </label>
              <input
                type="number"
                id="deductions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
                placeholder="0"
              />
            </div>

            {/* Pay Date */}
            <div className="flex flex-col">
              <label htmlFor="payDate" className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Pay Date
              </label>
              <input
                type="date"
                id="payDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-4"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type="submit"
              className='bg-blue-600 text-white text-xl font-bold rounded-lg px-12 py-4 hover:bg-blue-700 transition'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payroll

import type { JSX } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout(): JSX.Element {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full border-gray-200 bg-gray-800 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            
            <span className=" pr-10 text-2xl font-semibold whitespace-nowrap text-white">
              Employee Management System
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              
              <li>
                <a
                  href="#"
                  className=" border-2  bg-gray-700  px-3 py-1.5 rounded text-white font-normal hover:bg-gray-800 "
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Employees</span>
              </Link>
            </li>
            <li>
              <Link
                to="/department"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Department</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaves"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Leaves</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Payroll</span>
              </Link>
            </li>
            <li>
              <Link
                to="/attendance"
                className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3">Attendance</span>
              </Link>
            </li>           
          </ul>
        </div>
      </aside>

      {/* Main Content */}
          <div className="h-dvh bg-slate-100">
      {/* Outer background */}
      <div className="p-4  sm:ml-64 pt-20">
        {/* Inner content box */}
        <div className="p-4 rounded-lg bg-white shadow-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>

     
    </div>
  );
}

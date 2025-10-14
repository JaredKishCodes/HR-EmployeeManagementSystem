import type { JSX } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Layout(): JSX.Element {
  const navigate = useNavigate();

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          localStorage.getItem("token");
          navigate("login");
          Swal.fire("Logout success!", "", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the record.", "error");
        }
      }
    });
  };

  type MenuItem = {
    path: string;
    label: string;
    roles: string[];
  };

  const menuItems: MenuItem[] = [
    { path: "/dashboard", label: "Dashboard", roles: ["Admin"] },
    { path: "/employees", label: "Employees", roles: ["Admin", "Employee"] },
    { path: "/department", label: "Department", roles: ["Admin"] },
    { path: "/leaves", label: "Leaves", roles: ["Admin", "Employee"] },
    { path: "/attendance", label: "Attendance", roles: ["Admin", "Employee"] },
    {
      path: "/payroll",
      label: "Payroll",
      roles: ["Admin", "Employee", "Employee"],
    },
  ];

  const role = localStorage.getItem("role");
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full border-gray-200 bg-gray-800 dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="pr-10 text-2xl font-semibold whitespace-nowrap text-white">
              Employee Management System
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-700 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
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
            <ul className="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-transparent">
              <li>
                <a
                  onClick={onLogout}
                  className="cursor-pointer rounded border-1 bg-gray-700 px-3 py-1.5 font-normal text-white hover:bg-gray-800 hover:text-red-500"
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
        className="fixed top-16 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems
              .filter((item) => item.roles.includes(role ?? "")) // filter by role
              .map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center rounded-lg p-2 text-gray-50 hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="h-dvh bg-slate-100">
        {/* Outer background */}
        <div className="p-4 pt-20 sm:ml-64">
          {/* Inner content box */}
          <div className="rounded-lg bg-white p-4 shadow-lg dark:border-gray-700">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState<"user" | "admin">("user");

  const goToEmployeePage = () => {
    const navigate = useNavigate();
    return navigate("/layout");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${role}...`);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-800 font-sans text-gray-50">
      {/* Left: Login section */}
      <div className="flex w-1/2 flex-col items-center justify-center p-8">
        <h1 className="mb-6 text-4xl font-extrabold">Welcome Back</h1>

        <img
          src="/emp-face.png"
          alt="Employee"
          className="mb-6 h-24 w-24 rounded-full border border-gray-500 object-cover shadow-md"
        />

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-gray-600 bg-gray-700 p-8 shadow-lg"
        >
          {/* Tabs */}
          <div className="mb-2 flex items-center justify-between border-b border-gray-600 pb-3">
            <span className="font-semibold text-gray-200">Sign In</span>
            <div className="flex gap-3 text-gray-400">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`${
                  role === "user"
                    ? "font-semibold text-gray-50"
                    : "hover:text-gray-200"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`${
                  role === "admin"
                    ? "font-semibold text-gray-50"
                    : "hover:text-gray-200"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-gray-50 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder={`Enter your ${role} email`}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-gray-50 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            onClick={goToEmployeePage}
            type="submit"
            className="mt-2 cursor-pointer rounded-lg border border-gray-500 bg-gray-600 px-4 py-2 font-semibold text-gray-50 transition-all hover:bg-gray-500"
          >
            Login as {role === "admin" ? "Admin" : "User"}
          </button>
          <small className="m-auto cursor-pointer hover:text-gray-300 active:text-gray-400">
            Dont have an account?
          </small>
        </form>
      </div>

      {/* Right: Image section */}
      <div className="h-full w-1/2">
        <img
          src="/emp-login-page.webp"
          alt="Employee Login Page"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

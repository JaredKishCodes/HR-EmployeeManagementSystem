import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "Admin">("user");
  const [hasAccount, setHasAccount] = useState(true);

  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginForm = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const res = await axios.post(
        "https://localhost:7273/api/Account/login",
        loginForm,
      );

      // ✅ Save JWT token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("employeeId", res.data.employeeId);

      {
        res.data.role === "Admin"
          ? toast.success(`Welcome ${res.data.role}!`)
          : toast.success(
              `Welcome ${res.data.firstName} ${res.data.lastName}!`,
            );
      }
      setTimeout(() => setHasAccount(true), 500);

      console.log("Login successful:", res.data);

      // optionally redirect
      navigate(
        role === "Admin" ? "/employees" : `/employees/${res.data.employeeId}`,
      );
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      toast.error("Login failed", err.response?.data || err.message);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerForm = {
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: confirmRegisterPassword,
    };

    try {
      const res = await axios.post(
        "https://localhost:7273/api/Account/register",
        registerForm,
      );
      console.log("Registration successful:", res.data);

      // Optional: auto-login or show success message
      setHasAccount(true);
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-800 font-sans text-gray-50">
      {hasAccount ? (
        <div className="flex w-1/2 flex-col items-center justify-center p-8">
          <h1 className="mb-6 text-4xl font-extrabold">Welcome Back!</h1>

          <img
            src="/emp-face.png"
            alt="Employee"
            className="mb-6 h-24 w-24 rounded-full border border-gray-500 object-cover shadow-md"
          />

          <form
            onSubmit={onLogin}
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
                      : "cursor-pointer hover:text-gray-200"
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Admin")}
                  className={`${
                    role === "Admin"
                      ? "font-semibold text-gray-50"
                      : "cursor-pointer hover:text-gray-200"
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
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
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
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-lg border border-gray-500 bg-gray-600 px-4 py-2 font-semibold text-gray-50 transition-all hover:bg-gray-600"
            >
              Login as {role === "Admin" ? "Admin" : "User"}
            </button>
            <small
              onClick={() => setHasAccount(false)}
              className="m-auto cursor-pointer hover:text-gray-300 active:text-gray-400"
            >
              Dont have an account?
            </small>
          </form>
        </div>
      ) : (
        <div className="flex w-1/2 flex-col items-center justify-center p-8">
          <h1 className="mb-6 text-4xl font-extrabold">Hi Welcome!</h1>

          <img
            src="/emp-face.png"
            alt="Employee"
            className="mb-6 h-24 w-24 rounded-full border border-gray-500 object-cover shadow-md"
          />

          <form
            onSubmit={onRegister}
            className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-gray-600 bg-gray-700 p-8 shadow-lg"
          >
            {/* Tabs */}
            <div className="mb-2 flex items-center justify-between border-b border-gray-600 pb-3">
              <span className="font-semibold text-gray-200">Register</span>
            </div>

            {/* First Name & Last Name */}
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <div className="mb-4 flex flex-1 flex-col text-left sm:mb-0">
                <label
                  htmlFor="firstName"
                  className="mb-1 text-sm font-medium text-gray-200"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-gray-50 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter first name"
                  onChange={(e) => setRegisterFirstName(e.target.value)}
                  value={registerFirstName}
                  required
                />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <label
                  htmlFor="lastName"
                  className="mb-1 text-sm font-medium text-gray-200"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-gray-50 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter last name"
                  onChange={(e) => setRegisterLastName(e.target.value)}
                  value={registerLastName}
                  required
                />
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
                placeholder="Enter your email"
                onChange={(e) => setRegisterEmail(e.target.value)}
                value={registerEmail}
                required
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
                onChange={(e) => setRegisterPassword(e.target.value)}
                value={registerPassword}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="confirmPassword"
                className="mb-1 text-sm font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-gray-50 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmRegisterPassword(e.target.value)}
                value={confirmRegisterPassword}
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-lg border border-gray-500 bg-gray-600 px-4 py-2 font-semibold text-gray-50 transition-all hover:bg-gray-500"
            >
              Register
            </button>

            <small
              onClick={() => setHasAccount(true)}
              className="m-auto cursor-pointer hover:text-gray-300 active:text-gray-400"
            >
              Already have an account?
            </small>
          </form>
        </div>
      )}

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

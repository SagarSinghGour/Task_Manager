import React, { useState, useContext } from "react";
import { data } from "../App";
import { Globe } from "lucide-react";

const Login = () => {
  const { loginUser } = useContext(data);

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    // LOGIN
    if (isLogin) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please register first.");
        return;
      }

      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        alert("Login Successful");
        loginUser();
      } else {
        alert("Invalid Email or Password");
      }
    }

    // REGISTER
    else {
      if (!formData.name) {
        alert("Please enter your name.");
        return;
      }

      const existingUser = JSON.parse(localStorage.getItem("user"));

      if (
        existingUser &&
        existingUser.email === formData.email
      ) {
        alert("User already exists.");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      alert("Registration Successful");

      setIsLogin(true);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

   return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ background: "#eef2ff" }}
  >
    <div
      className="row shadow-lg rounded-4 overflow-hidden bg-white"
      style={{ width: "900px", minHeight: "550px" }}
    >
      {/* Left Side */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center text-white p-5"
        style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
        }}
      >
        <h1 className="fw-bold mb-4">Task Manager</h1>

        <p className="fs-5">
          Manage your tasks, projects and team with fully dynamic dashboard.
        </p>

      <div
  className="rounded-circle bg-dark d-flex justify-content-center align-items-center mt-4"
  style={{
    width: "250px",
    height: "250px",
    background: "#000",
  }}
>
  <Globe
    size={130}
    strokeWidth={2.2}
    color="#7C3AED"
  />
</div>
      </div>

      {/* Right Side */}
      <div className="col-md-6 d-flex align-items-center">
        <div className="w-100 px-5">

          <h1 className="fw-bold mb-5">
            {isLogin ? "Login" : "Register"}
          </h1>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="mb-4">
                <label className="fw-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="fw-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="fw-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 text-white"
              style={{
                background: "#4f46e5",
                border: "none",
                borderRadius: "12px",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </button>

          </form>

          <p className="text-center mt-4 mb-0">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              className="fw-bold ms-2"
              role="button"
              style={{ color: "#4f46e5" }}
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                });
              }}
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>

        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
import React, { useState, useContext } from "react";
import { data } from "../App";

export default function Login() {
  const { loginUser } = useContext(data);

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      if (isLogin) {
        loginUser(); // ✅ from context
         
      } else {
        alert("Account Created Successfully");
        loginUser(); // optional: auto-login after register
      }
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          {/* LEFT SIDE */}
          <div className="auth-left">
            <h1>Task Manager</h1>

            <p>
              Manage your tasks, projects and team with fully dynamic dashboard.
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/9068/9068756.png"
              alt="dashboard"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="auth-right">
            <h2>{isLogin ? "Login" : "Create Account"}</h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-box">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="input-box">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="bottom-text">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? " Register" : " Login"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        .auth-container{
          width:100%;
          min-height:100vh;
          background:#eef2ff;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .auth-card{
          width:100%;
          max-width:1050px;
          background:white;
          border-radius:30px;
          overflow:hidden;
          display:grid;
          grid-template-columns:1fr 1fr;
          box-shadow:0 10px 40px rgba(0,0,0,0.1);
        }

        .auth-left{
          background:linear-gradient(135deg,#4f46e5,#7c3aed);
          color:white;
          padding:60px 40px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          text-align:center;
        }

        .auth-left h1{
          font-size:38px;
          margin-bottom:20px;
        }

        .auth-left p{
          font-size:17px;
          line-height:1.7;
          margin-bottom:40px;
        }

        .auth-left img{
          width:280px;
          max-width:100%;
        }

        .auth-right{
          padding:60px 40px;
          display:flex;
          flex-direction:column;
          justify-content:center;
        }

        .auth-right h2{
          font-size:34px;
          margin-bottom:35px;
        }

        .input-box{
          margin-bottom:22px;
        }

        .input-box label{
          display:block;
          margin-bottom:8px;
          font-weight:600;
        }

        .input-box input{
          width:100%;
          padding:14px;
          border:1px solid #d1d5db;
          border-radius:12px;
          outline:none;
        }

        .input-box input:focus{
          border-color:#4f46e5;
          box-shadow:0 0 0 3px rgba(79,70,229,0.2);
        }

        .auth-btn{
          width:100%;
          padding:15px;
          border:none;
          border-radius:14px;
          background:#4f46e5;
          color:white;
          font-size:17px;
          font-weight:600;
          margin-top:10px;
        }

        .auth-btn:hover{
          background:#4338ca;
        }

        .bottom-text{
          margin-top:25px;
          text-align:center;
          color:#6b7280;
        }

        .bottom-text span{
          color:#4f46e5;
          font-weight:600;
          cursor:pointer;
        }

        @media(max-width:900px){
          .auth-card{
            grid-template-columns:1fr;
          }
        }
      `}</style>
    </>
  );
}
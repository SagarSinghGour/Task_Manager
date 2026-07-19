import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./Component/Sidebar";
import Dashbord from "./Component/Dashbord";
import AddTask from "./Component/AddTask";
import DataTask from "./Component/DataTask";
import Taskstats from "./Component/Taskstats";
import Login from "./Component/Login";
import AdminPanel from "./Component/AdminPanel";

import taskData from "./TaskData/DataApi";

export const data = createContext();

function App() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(taskData);
  const [filteredTasks, setFilteredTasks] = useState(taskData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [headingName, setHeadingName] = useState("ALL");

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  // Login
  const loginUser = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
    navigate("/");
  };

  // Logout
  const logoutUser = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  // Filter Tasks
  const filterTasks = (status) => {
    setFilterStatus(status);

    const filtered =
      status === "all"
        ? tasks
        : tasks.filter(
            (task) =>
              task.status.toLowerCase() === status.toLowerCase()
          );

    setFilteredTasks(filtered);
    setHeadingName(status === "all" ? "ALL" : status.toUpperCase());

    navigate("/data");
  };

  // Change Task Status
  const statusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Update filtered tasks whenever tasks/status changes
  useEffect(() => {
    setFilteredTasks(
      filterStatus === "all"
        ? tasks
        : tasks.filter(
            (task) =>
              task.status.toLowerCase() === filterStatus.toLowerCase()
          )
    );
  }, [tasks, filterStatus]);

  const Layout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />

    <main className="main-content">
      {children}
    </main>

    <style>{`
      *{
        box-sizing:border-box;
      }

      .app-layout{
        display:flex;
        min-height:100vh;
        width:100%;
      }

      .main-content{
        flex:1;
        margin-left:270px;
        padding:25px;
        background:#f5f7fb;
        min-height:100vh;
        overflow-x:hidden;
      }

      @media(max-width:991px){

        .main-content{
          margin-left:0;
          margin-top:65px;
          padding:15px;
        }

      }
    `}</style>
  </div>

  );

  return (
    <data.Provider
      value={{
        taskData: tasks,
        setTaskData: setTasks,
        filteredTasks,
        filterTasks,
        headingName,
        statusChange,
        loginUser,
        logoutUser,
        isAuth,
      }}
    >
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Layout><Dashbord /></Layout> : <Login />}
        />

        <Route
          path="/"
          element={isAuth ? <Layout><Dashbord /></Layout> : <Login />}
        />

        <Route
          path="/addTask"
          element={isAuth ? <Layout><AddTask /></Layout> : <Login />}
        />

        <Route
          path="/data"
          element={isAuth ? <Layout><DataTask /></Layout> : <Login />}
        />

        <Route
          path="/taskstats"
          element={isAuth ? <Layout><Taskstats /></Layout> : <Login />}
        />

        <Route
          path="/admin"
          element={isAuth ? <Layout><AdminPanel /></Layout> : <Login />}
        />
      </Routes>
    </data.Provider>
  );
}

export default App;
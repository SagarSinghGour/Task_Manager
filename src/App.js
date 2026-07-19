import React, { useState, createContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
  const [tasks, setTasks] = useState(taskData);
  const [filteredTasks, setFilteredTasks] = useState(taskData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [headingName, setHeadingName] = useState("ALL");

  // Read auth status from localStorage
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const navigate = useNavigate();

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

    if (status === "all") {
      setFilteredTasks(tasks);
      setHeadingName("ALL");
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.status.toLowerCase() === status.toLowerCase()
      );

      setFilteredTasks(filtered);
      setHeadingName(status.toUpperCase());
    }

    navigate("/data");
  };

  // Change Status
  const statusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Update filtered tasks
  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.status.toLowerCase() ===
            filterStatus.toLowerCase()
        )
      );
    }
  }, [tasks, filterStatus]);

  // Redirect after refresh
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const Layout = ({ children }) => (
    <div className="d-flex">
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
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
        {/* Login */}
        <Route
          path="/login"
          element={isAuth ? <Layout><Dashbord /></Layout> : <Login />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Layout>
                <Dashbord />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        {/* Add Task */}
        <Route
          path="/addTask"
          element={
            isAuth ? (
              <Layout>
                <AddTask />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        {/* Data */}
        <Route
          path="/data"
          element={
            isAuth ? (
              <Layout>
                <DataTask />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        {/* Stats */}
        <Route
          path="/taskstats"
          element={
            isAuth ? (
              <Layout>
                <Taskstats />
              </Layout>
            ) : (
              <Login />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            isAuth ? (
              <Layout>
                <AdminPanel />
              </Layout>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </data.Provider>
  );
}

export default App;
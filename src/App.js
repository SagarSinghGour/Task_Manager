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
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const loginUser = () => {
    setIsAuth(true);
    navigate("/");
  };

  const logoutUser = () => {
    setIsAuth(false);
    navigate("/login");
  };

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

  const statusChange = (id, newstatus) => {
    setTasks(
      tasks.map((a) =>
        a.id === id ? { ...a, status: newstatus } : a
      )
    );
  };

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter(
          (t) =>
            t.status.toLowerCase() === filterStatus.toLowerCase()
        )
      );
    }
  }, [tasks, filterStatus]);

  const Layout = ({ children }) => (
    <div className="d-flex">
      <Sidebar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
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
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />

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
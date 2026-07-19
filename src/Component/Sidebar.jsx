import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { data } from "../App";

export default function Sidebar() {
  const { filterTasks, logoutUser } = useContext(data);

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  const handleAction = (action) => {
    closeSidebar();
    if (action) action();
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "bi-speedometer2",
    },
    {
      name: "Completed Tasks",
      icon: "bi-check-circle-fill",
      action: () => filterTasks("completed"),
    },
    {
      name: "Pending Tasks",
      icon: "bi-hourglass-split",
      action: () => filterTasks("pending"),
    },
    {
      name: "In Progress",
      icon: "bi-arrow-repeat",
      action: () => filterTasks("In Progress"),
    },
    {
      name: "Deployed Tasks",
      icon: "bi-cloud-upload-fill",
      action: () => filterTasks("deployed"),
    },
    {
      name: "Deferred Tasks",
      icon: "bi-pause-circle-fill",
      action: () => filterTasks("deferred"),
    },
    {
      name: "Add New Task",
      path: "/addTask",
      icon: "bi-plus-circle-fill",
    },
    {
      name: "Task Stats",
      path: "/taskstats",
      icon: "bi-bar-chart-fill",
    },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="mobile-navbar d-lg-none">
        <h4>Task Manager</h4>

        <button onClick={() => setIsOpen(true)}>
          <i className="bi bi-list"></i>
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar-container ${isOpen ? "show-sidebar" : ""}`}>
        <div className="sidebar">
          <h2 className="logo">Task Manager</h2>

          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`sidebar-link ${location.pathname === item.path ? "active-link" : ""
                      }`}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <button
                    className="sidebar-link"
                    onClick={() => handleAction(item.action)}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button
            className="logout-btn"
            onClick={() => {
              logoutUser();
              closeSidebar();
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </aside>

      <style>{`
 *{
margin:0;
padding:0;
box-sizing:border-box;
}

.mobile-navbar{
display:none;
}

/* Sidebar */

.sidebar-container{
position:fixed;
top:0;
left:0;
width:270px;
height:100vh;
background:linear-gradient(180deg,#4f46e5,#4338ca);
overflow-y:auto;
z-index:1050;
transition:left .3s ease;
}

.sidebar{
display:flex;
    flex-direction:column;
    height:100dvh;
    padding:25px 18px;
    overflow-y:auto;
}

.logo{
color:#fff;
text-align:center;
font-weight:bold;
margin-bottom:30px;
}

.sidebar ul{
list-style:none;
display:flex;
flex-direction:column;
gap:15px;
padding:0;
margin:0;
}

.sidebar-link{
width:100%;
display:flex;
align-items:center;
gap:15px;
padding:15px;
background:rgba(255,255,255,.08);
border:none;
border-radius:12px;
color:#fff;
text-decoration:none;
font-size:16px;
cursor:pointer;
transition:.3s;
}

.sidebar-link:hover{
background:#fff;
color:#4f46e5;
transform:translateX(5px);
}

.active-link{
background:#fff;
color:#4f46e5 !important;
font-weight:bold;
}

.logout-btn{
margin-top:auto;
    padding:15px;
    background:#6b7280;
    border:none;
    border-radius:12px;
    color:#fff;
 
    align-items:center;
    justify-content:center;
    gap:15px;
    cursor:pointer;
    flex-shrink:0;
}

.logout-btn:hover{
background:#ef4444;
}

.overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.45);
z-index:1040;
}

/* Mobile */

@media(max-width:991px){

.mobile-navbar{
display:flex;
position:fixed;
top:0;
left:0;
right:0;
height:65px;
background:#4f46e5;
align-items:center;
justify-content:space-between;
padding:0 20px;
z-index:1100;
}

.mobile-navbar h4{
margin:0;
color:#fff;
font-size:22px;
font-weight:bold;
}

.mobile-navbar button{
width:45px;
height:45px;
border:none;
background:#fff;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

.mobile-navbar i{
font-size:30px;
color:#4f46e5;
}

.sidebar-container{
left:-270px;
}

.show-sidebar{
left:0;
}

.sidebar{
padding-top:80px;
}

}

/* Desktop */

@media(min-width:992px){

.mobile-navbar{
display:none;
}

.sidebar-container{
left:0;
}

}
      `}</style>
    </>
  );
}
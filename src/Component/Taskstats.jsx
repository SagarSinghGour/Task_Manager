import React, { useContext } from "react";
import { data } from "../App";

export default function Taskstats() {
  const { taskData } = useContext(data);

  // Total Tasks
  const totalTask = taskData.length;

  // Completed Tasks
  const completedTask = taskData.filter(
    (task) =>
      task.status.toLowerCase() === "completed"
  ).length;

  // Pending Tasks
  const pendingTask = taskData.filter(
    (task) =>
      task.status.toLowerCase() === "pending"
  ).length;

  // In Progress Tasks ✅ FIXED
  const progressTask = taskData.filter(
    (task) =>
      task.status.toLowerCase() ===
      "in progress"
  ).length;

  // Deployed Tasks
  const deployedTask = taskData.filter(
    (task) =>
      task.status.toLowerCase() === "deployed"
  ).length;

  // Deferred Tasks
  const deferredTask = taskData.filter(
    (task) =>
      task.status.toLowerCase() === "deferred"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      count: totalTask,
      icon: "bi-list-task",
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Completed Tasks",
      count: completedTask,
      icon: "bi-check-circle-fill",
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      title: "In Progress Tasks",
      count: progressTask,
      icon: "bi-arrow-repeat",
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "Pending Tasks",
      count: pendingTask,
      icon: "bi-hourglass-split",
      color: "#db2777",
      bg: "#fce7f3",
    },
    {
      title: "Deployed Tasks",
      count: deployedTask,
      icon: "bi-cloud-upload-fill",
      color: "#7c3aed",
      bg: "#ede9fe",
    },
    {
      title: "Deferred Tasks",
      count: deferredTask,
      icon: "bi-pause-circle-fill",
      color: "#0d9488",
      bg: "#ccfbf1",
    },
  ];

  return (
    <>
      <div className="stats-container">
        {/* Header */}
        <div className="stats-header">
          <div>
            <h2>Task Statistics</h2>

            <p>
              Monitor all your task progress
              easily
            </p>
          </div>

          <div className="stats-icon">
            <i className="bi bi-bar-chart-fill"></i>
          </div>
        </div>

        {/* Cards */}
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div
              key={index}
              className="stats-card"
            >
              <div className="stats-top">
                <div>
                  <h5>{item.title}</h5>

                  <h1>{item.count}</h1>

                  <span>
                    Updated this month
                  </span>
                </div>

                <div
                  className="stats-card-icon"
                  style={{
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  <i
                    className={`bi ${item.icon}`}
                  ></i>
                </div>
              </div>

              <div
                className="bottom-line"
                style={{
                  background: item.color,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .stats-container{
          width:100%;
          min-height:100vh;
          background:#f5f7fb;
          padding:30px;
        }

        .stats-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:35px;
          flex-wrap:wrap;
          gap:20px;
        }

        .stats-header h2{
          font-weight:700;
          margin-bottom:5px;
        }

        .stats-header p{
          color:#6b7280;
          margin:0;
        }

        .stats-icon{
          width:70px;
          height:70px;
          background:#4f46e5;
          border-radius:20px;
          display:flex;
          justify-content:center;
          align-items:center;
          color:white;
          font-size:30px;
          box-shadow:0 5px 15px rgba(79,70,229,0.3);
        }

        .stats-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(280px,1fr));
          gap:25px;
        }

        .stats-card{
          background:white;
          border-radius:22px;
          padding:25px;
          box-shadow:
          0 5px 20px rgba(0,0,0,0.08);
          transition:0.3s ease;
          overflow:hidden;
          position:relative;
        }

        .stats-card:hover{
          transform:translateY(-5px);
        }

        .stats-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:20px;
        }

        .stats-top h5{
          font-size:16px;
          font-weight:600;
          color:#6b7280;
          margin-bottom:15px;

          /* FIX TEXT LINE */
          white-space:nowrap;
        }

        .stats-top h1{
          font-size:42px;
          font-weight:700;
          margin-bottom:8px;
        }

        .stats-top span{
          color:#9ca3af;
          font-size:14px;
        }

        .stats-card-icon{
          width:65px;
          height:65px;
          border-radius:18px;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:28px;
          flex-shrink:0;
        }

        .bottom-line{
          width:100%;
          height:5px;
          position:absolute;
          bottom:0;
          left:0;
        }

        @media (max-width:768px){

          .stats-container{
            padding:15px;
          }

          .stats-header{
            flex-direction:column;
            align-items:flex-start;
          }

          .stats-card{
            padding:20px;
          }

          .stats-top{
            gap:15px;
          }

          .stats-top h1{
            font-size:35px;
          }

          .stats-card-icon{
            width:55px;
            height:55px;
            font-size:24px;
          }

          .stats-top h5{
            white-space:normal;
          }
        }
      `}</style>
    </>
  );
}
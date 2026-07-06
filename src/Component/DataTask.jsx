import React, { useContext } from "react";
import { data } from "../App";

export default function DataTask() {
  const { filteredTasks, hadingname, statusChange } =
    useContext(data);
 
  // Status Color Function
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          color: "#16a34a",
          bg: "#dcfce7",
        };

      case "pending":
        return {
          color: "#ca8a04",
          bg: "#fef9c3",
        };

      case "in progress":
        return {
          color: "#db2777",
          bg: "#fce7f3",
        };

      case "deployed":
        return {
          color: "#2563eb",
          bg: "#dbeafe",
        };

      case "deferred":
        return {
          color: "#6b7280",
          bg: "#f3f4f6",
        };

      default:
        return {
          color: "#4f46e5",
          bg: "#eef2ff",
        };
    }
  };

  // Empty State
  if (filteredTasks.length === 0) {
    return ( 
      <>
      
        <div className="empty-container">
          <i className="bi bi-inbox"></i>

          <h2>No Tasks Found</h2>

          <p>Your selected task list is empty</p>
        </div>

        <style>{`
          .empty-container{
            width:100%;
            min-height:100vh;
            background:#f5f7fb;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
            padding:20px;
          }

          .empty-container i{
            font-size:80px;
            color:#4f46e5;
            margin-bottom:20px;
          }

          .empty-container h2{
            font-weight:bold;
            margin-bottom:10px;
          }

          .empty-container p{
            color:gray;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="task-page">

        {/* Header */}
        <div className="task-header">

          <div>
            <h2>{hadingname} Tasks</h2>

            <p>
              Manage and update all your project tasks
            </p>
          </div>

          <div className="task-count">
            <i className="bi bi-list-task"></i>

            <span>{filteredTasks.length} Tasks</span>
          </div>
        </div>

        {/* Cards */}
        <div className="task-grid">

          {filteredTasks.map((value, index) => {

            const statusStyle = getStatusStyle(value.status);

            return (
              <div className="task-card" key={index}>

                {/* Top */}
                <div
                  className="task-top"
                  style={{
                    background: statusStyle.bg,
                  }}
                >
                  <span
                    className="priority-badge"
                    style={{
                      background: statusStyle.color,
                    }}
                  >
                    {value.priority}
                  </span>

                  <h3
                    style={{
                      color: statusStyle.color,
                    }}
                  >
                    {value.taskName}
                  </h3>
                </div>

                {/* Description */}
                <div className="task-description">
                  {value.taskDescription}
                </div>

                {/* Date Box */}
                <div className="task-date-box">

                  <div>
                    <span>Start Date</span>

                    <p>{value.startDate}</p>
                  </div>

                  <div>
                    <span>End Date</span>

                    <p>{value.endDate}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="task-footer">

                  <div className="user-box">
                    <i className="bi bi-person-circle"></i>

                    <span>Sagar</span>
                  </div>

                  <button
                    className="status-btn"
                    style={{
                      background: statusStyle.color,
                    }}
                    onClick={() =>
                      statusChange(value.id, "completed")
                    }
                  >
                    {value.status}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS */}
      <style>{`

        .task-page{
          width:100%;
          min-height:100vh;
          background:#f5f7fb;
          padding:25px;
        }

        .task-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:35px;
          gap:20px;
          flex-wrap:wrap;
        }

        .task-header h2{
          font-size:32px;
          font-weight:bold;
          margin-bottom:5px;
        }

        .task-header p{
          color:gray;
          margin:0;
        }

        .task-count{
          background:white;
          padding:14px 22px;
          border-radius:16px;
          display:flex;
          align-items:center;
          gap:10px;
          box-shadow:0 4px 15px rgba(0,0,0,0.08);
          color:#4f46e5;
          font-weight:bold;
        }

        .task-count i{
          font-size:22px;
        }

        .task-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(320px,1fr));

          gap:25px;
        }

        .task-card{
          background:white;
          border-radius:24px;
          padding:22px;
          display:flex;
          flex-direction:column;
          gap:22px;
          box-shadow:0 5px 20px rgba(0,0,0,0.08);
          transition:0.3s ease;
        }

        .task-card:hover{
          transform:translateY(-6px);
        }

        .task-top{
          padding:25px;
          border-radius:20px;
          position:relative;
          text-align:center;
        }

        .priority-badge{
          position:absolute;
          top:14px;
          right:15px;
          color:white;
          padding:5px 12px;
          border-radius:30px;
          font-size:12px;
          font-weight:bold;
        }

        .task-top h3{
          margin-top:20px;
          font-weight:bold;
          word-break:break-word;
        }

        .task-description{
          line-height:1.7;
          color:#555;
          min-height:80px;
          word-break:break-word;
        }

        .task-date-box{
          background:#f8fafc;
          padding:18px;
          border-radius:14px;
          display:flex;
          justify-content:space-between;
          flex-wrap:wrap;
          gap:15px;
        }

        .task-date-box span{
          color:gray;
          font-size:13px;
        }

        .task-date-box p{
          margin:0;
          font-weight:bold;
        }

        .task-footer{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:15px;
          flex-wrap:wrap;
        }

        .user-box{
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:600;
        }

        .user-box i{
          font-size:24px;
          color:#4f46e5;
        }

        .status-btn{
          border:none;
          color:white;
          padding:11px 20px;
          border-radius:12px;
          font-weight:600;
          text-transform:capitalize;
          transition:0.3s ease;
        }

        .status-btn:hover{
          opacity:0.9;
          transform:scale(1.03);
        }

        @media(max-width:768px){

          .task-page{
            padding:15px;
          }

          .task-header{
            flex-direction:column;
            align-items:flex-start;
          }

          .task-grid{
            grid-template-columns:1fr;
          }

          .task-footer{
            flex-direction:column;
            align-items:flex-start;
          }

          .status-btn{
            width:100%;
          }
        }

      `}</style>
    </>
  );
}
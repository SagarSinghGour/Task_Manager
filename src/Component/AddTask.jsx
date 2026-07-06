import React, { useState, useContext } from "react";
import { data } from "../App";

export default function AddTask() {
  const { taskData, setTaskData } = useContext(data);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("P2");

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: taskData.length + 1,
      taskName,
      taskDescription,
      startDate,
      endDate,
      status,
      priority,
    };

    setTaskData([...taskData, newTask]);

    // Reset Form
    setTaskName("");
    setTaskDescription("");
    setStartDate("");
    setEndDate("");
    setStatus("Pending");
    setPriority("P2");
  };

  return (
    <>
      <div className="add-task-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h2>Add New Task</h2>
            <p>Create and manage your tasks easily</p>
          </div>

          <div className="header-icon">
            <i className="bi bi-plus-circle-fill"></i>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {/* Task Name */}
            <div className="form-group">
              <label>Task Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) =>
                  setTaskName(e.target.value)
                }
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Task Description</label>

              <textarea
                rows={4}
                className="form-control"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                required
              ></textarea>
            </div>

            {/* Dates */}
            <div className="date-grid">
              <div className="form-group">
                <label>Start Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Status + Priority */}
            <div className="date-grid">
              {/* Status */}
              <div className="form-group">
                <label>Status</label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Deployed">
                    Deployed
                  </option>

                  <option value="Deferred">
                    Deferred
                  </option>
                </select>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label>Priority</label>

                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                >
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="submit-btn"
            >
              <i className="bi bi-plus-lg"></i>
              Add Task
            </button>
          </form>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .add-task-container{
          width:100%;
          min-height:100vh;
          padding:30px;
          background:#f5f7fb;
        }

        .page-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:30px;
          flex-wrap:wrap;
          gap:20px;
        }

        .page-header h2{
          font-weight:bold;
          margin-bottom:5px;
        }

        .page-header p{
          color:gray;
        }

        .header-icon{
          width:70px;
          height:70px;
          border-radius:20px;
          background:#4f46e5;
          display:flex;
          justify-content:center;
          align-items:center;
          color:white;
          font-size:30px;
          box-shadow:0 5px 15px rgba(79,70,229,0.3);
        }

        .form-card{
          width:100%;
          max-width:900px;
          margin:auto;
          background:white;
          padding:35px;
          border-radius:24px;
          box-shadow:0 5px 20px rgba(0,0,0,0.08);
        }

        .form-group{
          margin-bottom:25px;
        }

        .form-group label{
          display:block;
          font-weight:600;
          margin-bottom:10px;
          color:#374151;
        }

        .form-control,
        .form-select{
          height:52px;
          border-radius:14px;
          border:1px solid #d1d5db;
          padding:12px;
          font-size:15px;
          transition:0.3s;
        }

        textarea.form-control{
          height:auto;
          resize:none;
        }

        .form-control:focus,
        .form-select:focus{
          border-color:#4f46e5;
          box-shadow:0 0 0 0.2rem rgba(79,70,229,0.15);
        }

        .date-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:20px;
        }

        .submit-btn{
          width:100%;
          border:none;
          background:#4f46e5;
          color:white;
          padding:15px;
          border-radius:14px;
          font-size:17px;
          font-weight:600;
          display:flex;
          justify-content:center;
          align-items:center;
          gap:10px;
          transition:0.3s ease;
          margin-top:10px;
        }

        .submit-btn:hover{
          background:#4338ca;
          transform:translateY(-2px);
        }

        @media (max-width:768px){

          .add-task-container{
            padding:15px;
          }

          .form-card{
            padding:22px;
            border-radius:18px;
          }

          .date-grid{
            grid-template-columns:1fr;
          }

          .page-header{
            flex-direction:column;
            align-items:flex-start;
          }

          .header-icon{
            width:60px;
            height:60px;
            font-size:25px;
          }
        }
      `}</style>
    </>
  );
}
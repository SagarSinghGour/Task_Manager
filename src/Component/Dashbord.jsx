import React, { useContext, useState } from "react";
import { data } from "../App";

export default function Dashbord() {
  const { taskData } = useContext(data);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    priority: "",
    status: "",
  });

  // Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter Tasks
  const filteredTasks = taskData.filter((task) => {
    const { startDate, endDate, priority, status } = filters;

    const isStartDateValid =
      !startDate || new Date(task.startDate) >= new Date(startDate);

    const isEndDateValid =
      !endDate || new Date(task.endDate) <= new Date(endDate);

    const isPriorityValid =
      !priority ||
      task.priority.toLowerCase() === priority.toLowerCase();

    const isStatusValid =
      !status || task.status.toLowerCase() === status.toLowerCase();

    return (
      isStartDateValid &&
      isEndDateValid &&
      isPriorityValid &&
      isStatusValid
    );
  });

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="fw-bold">Task Dashboard</h2>
            <p className="text-muted">
              Manage and track all your tasks easily
            </p>
          </div>

          <div className="task-count">
            <i className="bi bi-list-task"></i>
            <span>{filteredTasks.length} Tasks</span>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-card">
          <div className="filter-top">
            <h4 className="fw-bold">Filters</h4>

            <button
              className="btn btn-danger"
              onClick={() =>
                setFilters({
                  startDate: "",
                  endDate: "",
                  priority: "",
                  status: "",
                })
              }
            >
              Reset
            </button>
          </div>

          <div className="filter-grid">
            {/* Start Date */}
            <div className="filter-item">
              <label>Start Date</label>

              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            {/* End Date */}
            <div className="filter-item">
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            {/* Status */}
            <div className="filter-item">
              <label>Status</label>

              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="deployed">Deployed</option>
                <option value="deferred">Deferred</option>
              </select>
            </div>

            {/* Priority */}
            <div className="filter-item">
              <label>Priority</label>

              <select
                className="form-select"
                value={filters.priority}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
              >
                <option value="">All Priority</option>
                <option value="p0">P0</option>
                <option value="p1">P1</option>
                <option value="p2">P2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="task-grid">
          {filteredTasks.map((value, index) => {
            // Status Color
            const statusColor =
              value.status.toLowerCase() === "completed"
                ? "#16a34a"
                : value.status.toLowerCase() === "pending"
                ? "#ca8a04"
                : value.status.toLowerCase() === "in progress"
                ? "#db2777"
                : value.status.toLowerCase() === "deployed"
                ? "#2563eb"
                : "#6b7280";

            // Background Color
            const statusBg =
              value.status.toLowerCase() === "completed"
                ? "#dcfce7"
                : value.status.toLowerCase() === "pending"
                ? "#fef9c3"
                : value.status.toLowerCase() === "in progress"
                ? "#fce7f3"
                : value.status.toLowerCase() === "deployed"
                ? "#dbeafe"
                : "#f3f4f6";

            return (
              <div className="task-card" key={index}>
                {/* Top */}
                <div
                  className="task-top"
                  style={{
                    background: statusBg,
                  }}
                >
                  <span
                    className="priority-badge"
                    style={{
                      background: statusColor,
                    }}
                  >
                    {value.priority}
                  </span>

                  <h4
                    style={{
                      color: statusColor,
                    }}
                  >
                    {value.taskName}
                  </h4>
                </div>

                {/* Description */}
                <div className="task-description">
                  {value.taskDescription}
                </div>

                {/* Dates */}
                <div className="task-dates">
                  <div>
                    <span>Start</span>
                    <p>{value.startDate}</p>
                  </div>

                  <div>
                    <span>End</span>
                    <p>{value.endDate}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="task-footer">
                  <div className="user-info">
                    <i className="bi bi-person-circle"></i>
                    <span>Sagar</span>
                  </div>

                  <button
                    className="status-btn"
                    style={{
                      background: statusColor,
                    }}
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
        .dashboard-container {
          width: 100%;
          padding: 25px;
          margin-top: 20px;
          background: #f5f7fb;
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .task-count {
          background: white;
          padding: 14px 20px;
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
          color: #4f46e5;
        }

        .task-count i {
          font-size: 24px;
        }

        .filter-card {
          background: white;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }

        .filter-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .filter-item label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .task-card {
          background: white;
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .task-card:hover {
          transform: translateY(-5px);
        }

        .task-top {
          padding: 18px;
          border-radius: 15px;
          text-align: center;
          position: relative;
        }

        .priority-badge {
          position: absolute;
          top: 10px;
          right: 14px;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .task-top h4 {
          margin-top: 15px;
          font-weight: bold;
        }

        .task-description {
          color: #555;
          font-size: 15px;
          line-height: 1.6;
          min-height: 70px;
        }

        .task-dates {
          display: flex;
          justify-content: space-between;
          background: #f8fafc;
          padding: 14px;
          border-radius: 12px;
        }

        .task-dates span {
          font-size: 13px;
          color: gray;
        }

        .task-dates p {
          margin: 0;
          font-weight: bold;
        }

        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          flex-wrap: wrap;
          gap: 15px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .user-info i {
          font-size: 22px;
          color: #4f46e5;
        }

        .status-btn {
          border: none;
          color: white;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: capitalize;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .task-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .status-btn {
            width: 100%;
          }

          .task-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
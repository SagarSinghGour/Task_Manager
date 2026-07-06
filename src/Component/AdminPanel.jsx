export default function AdminPanel() {
  const stats = [
    {
      title: "Total Users",
      count: 1240,
      icon: "bi-people-fill",
      color: "#4f46e5",
      bg: "#e0e7ff",
    },
    {
      title: "Completed Tasks",
      count: 320,
      icon: "bi-check-circle-fill",
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      title: "Pending Tasks",
      count: 85,
      icon: "bi-hourglass-split",
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "Revenue",
      count: "$12K",
      icon: "bi-currency-dollar",
      color: "#db2777",
      bg: "#fce7f3",
    },
  ];

  const tasks = [
    {
      id: 1,
      name: "Create Dashboard UI",
      priority: "P1",
      status: "Completed",
      user: "Sagar",
    },
    {
      id: 2,
      name: "API Integration",
      priority: "P0",
      status: "In Progress",
      user: "Rahul",
    },
    {
      id: 3,
      name: "Fix Authentication",
      priority: "P2",
      status: "Pending",
      user: "Aman",
    },
    {
      id: 4,
      name: "Deploy Project",
      priority: "P1",
      status: "Deployed",
      user: "Vikas",
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h2 className="logo">
            <i className="bi bi-grid-fill"></i>
            Admin Panel
          </h2>

          <ul className="menu">
            <li className="active">
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </li>

            <li>
              <i className="bi bi-list-task"></i>
              Tasks
            </li>

            <li>
              <i className="bi bi-people-fill"></i>
              Users
            </li>

            <li>
              <i className="bi bi-bar-chart-fill"></i>
              Analytics
            </li>

            <li>
              <i className="bi bi-gear-fill"></i>
              Settings
            </li>
          </ul>
        </div>

        <button className="logout-btn">
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your project and tasks efficiently</p>
          </div>

          <div className="profile">
            <i className="bi bi-person-circle"></i>
            <span>Sagar</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <div>
                <h5>{item.title}</h5>
                <h2>{item.count}</h2>
              </div>

              <div
                className="stat-icon"
                style={{
                  background: item.bg,
                  color: item.color,
                }}
              >
                <i className={`bi ${item.icon}`}></i>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="task-section">
          <div className="task-header">
            <h3>Recent Tasks</h3>

            <button className="add-btn">
              <i className="bi bi-plus-lg"></i>
              Add Task
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task Name</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>User</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>
                      <span className="priority">
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${task.status
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>{task.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial, sans-serif;
        }

        .admin-layout{
          display:flex;
          min-height:100vh;
          background:#f5f7fb;
        }

        .sidebar{
          width:280px;
          background:linear-gradient(180deg,#4f46e5,#4338ca);
          color:white;
          padding:30px 20px;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }

        .logo{
          font-size:28px;
          font-weight:bold;
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:40px;
        }

        .menu{
          list-style:none;
          display:flex;
          flex-direction:column;
          gap:15px;
        }

        .menu li{
          padding:15px;
          border-radius:14px;
          display:flex;
          align-items:center;
          gap:12px;
          cursor:pointer;
          transition:0.3s;
          font-size:16px;
          font-weight:500;
        }

        .menu li:hover,
        .menu .active{
          background:white;
          color:#4f46e5;
        }

        .logout-btn{
          border:none;
          padding:14px;
          border-radius:14px;
          background:white;
          color:#4f46e5;
          font-weight:bold;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
        }

        .main-content{
          flex:1;
          padding:30px;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:30px;
          flex-wrap:wrap;
          gap:20px;
        }

        .header h1{
          font-size:34px;
          margin-bottom:8px;
        }

        .header p{
          color:gray;
        }

        .profile{
          background:white;
          padding:12px 18px;
          border-radius:14px;
          display:flex;
          align-items:center;
          gap:10px;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);
          font-weight:600;
        }

        .profile i{
          font-size:28px;
          color:#4f46e5;
        }

        .stats-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          gap:25px;
          margin-bottom:35px;
        }

        .stat-card{
          background:white;
          padding:25px;
          border-radius:20px;
          box-shadow:0 5px 15px rgba(0,0,0,0.08);
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .stat-card h5{
          color:gray;
          margin-bottom:10px;
        }

        .stat-card h2{
          font-size:34px;
        }

        .stat-icon{
          width:70px;
          height:70px;
          border-radius:18px;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:28px;
        }

        .task-section{
          background:white;
          border-radius:24px;
          padding:25px;
          box-shadow:0 5px 15px rgba(0,0,0,0.08);
        }

        .task-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:25px;
          flex-wrap:wrap;
          gap:15px;
        }

        .add-btn{
          border:none;
          background:#4f46e5;
          color:white;
          padding:12px 18px;
          border-radius:12px;
          display:flex;
          align-items:center;
          gap:10px;
          cursor:pointer;
          font-weight:600;
        }

        .table-wrapper{
          overflow-x:auto;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th,
        td{
          padding:16px;
          text-align:left;
          border-bottom:1px solid #eee;
        }

        th{
          color:#6b7280;
          font-size:14px;
        }

        .priority{
          background:#e0e7ff;
          color:#4f46e5;
          padding:6px 12px;
          border-radius:20px;
          font-size:14px;
          font-weight:600;
        }

        .status{
          padding:6px 14px;
          border-radius:20px;
          font-size:14px;
          font-weight:600;
        }

        .completed{
          background:#d1fae5;
          color:#059669;
        }

        .in-progress{
          background:#fef3c7;
          color:#d97706;
        }

        .pending{
          background:#fee2e2;
          color:#dc2626;
        }

        .deployed{
          background:#ede9fe;
          color:#7c3aed;
        }

        @media(max-width:992px){
          .sidebar{
            width:90px;
            padding:20px 10px;
          }

          .logo{
            font-size:0;
            justify-content:center;
          }

          .logo i{
            font-size:30px;
          }

          .menu li{
            justify-content:center;
            font-size:0;
          }

          .menu li i{
            font-size:22px;
          }

          .logout-btn{
            font-size:0;
          }

          .logout-btn i{
            font-size:20px;
          }
        }

        @media(max-width:768px){
          .admin-layout{
            flex-direction:column;
          }

          .sidebar{
            width:100%;
            flex-direction:row;
            align-items:center;
            overflow-x:auto;
            gap:20px;
          }

          .menu{
            flex-direction:row;
          }

          .main-content{
            padding:15px;
          }

          .header h1{
            font-size:26px;
          }

          .stat-card h2{
            font-size:26px;
          }
        }
      `}</style>
    </div>
  );
}

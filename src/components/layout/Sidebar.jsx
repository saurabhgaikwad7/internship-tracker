import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = ({ mobileOpen, closeMobile }) => {
  // 🔹 Load initial state from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  // 🔹 Save state whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  return (
    <aside
      className={`sidebar 
        ${collapsed ? "collapsed" : ""} 
        ${mobileOpen ? "mobile-open" : ""}
      `}
    >
      <div className="sidebar-top">
        <h2 className="logo">{collapsed ? "IT" : "InternTrack"}</h2>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav className="nav-links" onClick={closeMobile}>
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/add-internship">Add Internship</NavLink>

        <NavLink to="/analytics">Analytics</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

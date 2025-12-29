import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = ({ mobileOpen, closeMobile }) => {
  const [collapsed, setCollapsed] = useState(() =>
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleNavClick = () => {
    if (mobileOpen) closeMobile();
  };

  return (
    <aside
      className={`sidebar 
        ${collapsed ? "collapsed" : ""} 
        ${mobileOpen ? "mobile-open" : ""}
      `}
    >
      <div className="sidebar-top">
        <h2 className="logo">
          InternTrack
        </h2>
      </div>

      <nav className="nav-links" onClick={handleNavClick}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/add-internship">Add Internship</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

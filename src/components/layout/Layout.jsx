import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, title }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        closeMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="main-section">
        <Header
          title={title}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

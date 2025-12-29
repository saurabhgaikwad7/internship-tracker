import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, title }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen
      ? "hidden"
      : "auto";
  }, [mobileSidebarOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="app-layout">
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

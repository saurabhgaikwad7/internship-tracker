import { useAuth } from "../../context/AuthContext";

const Header = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h3>{title}</h3>
      </div>

      <div className="user-section">
        {user && (
          <>
            <span className="username">
              {user.name || "User"}
            </span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

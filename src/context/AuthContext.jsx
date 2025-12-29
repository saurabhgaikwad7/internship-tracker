import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// 🔐 Simple hash (demo only – NOT for real backend)
const hash = (value) => btoa(value);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Signup
  const signup = (userData) => {
    const safeUser = {
      ...userData,
      password: hash(userData.password),
    };

    localStorage.setItem("user", JSON.stringify(safeUser));
    setUser(safeUser);
  };

  // ✅ Login
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === hash(password)
    ) {
      localStorage.setItem("user", JSON.stringify(storedUser));
      setUser(storedUser);
      return true;
    }
    return false;
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

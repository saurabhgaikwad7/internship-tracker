import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import FilterBar from "../components/FilterBar";
import InternshipForm from "../components/InternshipForm";
import InternshipList from "../components/InternshipList";
import { loadInternships, saveInternships } from "../utils/storage";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [internships, setInternships] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInternships(loadInternships());
  }, []);

  useEffect(() => {
    saveInternships(internships);
  }, [internships]);

  const addInternship = (newInternship) => {
    setInternships([newInternship, ...internships]);
  };

  const deleteInternship = (id) => {
    setInternships(internships.filter((item) => item.id !== id));
  };

  const filteredInternships = internships.filter((item) => {
    const matchesStatus =
      filter === "All" || item.status === filter;

    const matchesSearch =
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-welcome">Welcome, {user?.name}</h2>
        <button className="dashboard-logout" onClick={logout}>Logout</button>
      </header>

      <DashboardCards internships={internships} />

      <FilterBar setFilter={setFilter} setSearch={setSearch} />

      <InternshipForm onAdd={addInternship} />

      <InternshipList
        internships={filteredInternships}
        onDelete={deleteInternship}
      />
    </div>
  );
};

export default Dashboard;

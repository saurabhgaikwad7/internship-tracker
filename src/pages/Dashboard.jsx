import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import DashboardCards from "../components/DashboardCards";
import FilterBar from "../components/FilterBar";
import InternshipList from "../components/InternshipList";
import { useInternships } from "../context/InternshipsContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { internships, deleteInternship } = useInternships();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // 🔹 Filter ONLY for list rendering
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const status = internship.currentStatus || internship.status;
      const matchesFilter =
        filter === "All" ||
        status === filter;

      const matchesSearch =
        internship.company.toLowerCase().includes(search.toLowerCase()) ||
        internship.role.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [internships, filter, search]);

  return (
    <Layout title="Dashboard">
      {/* ✅ Use ALL internships for analytics */}
      <DashboardCards internships={internships} />

      <FilterBar
        setFilter={setFilter}
        setSearch={setSearch}
      />

      <InternshipList
        internships={filteredInternships}
        onDelete={deleteInternship}
      />
    </Layout>
  );
};

export default Dashboard;

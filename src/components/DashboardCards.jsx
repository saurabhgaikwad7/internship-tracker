import { useMemo } from "react";

const Card = ({ label, value }) => {
  return (
    <div className="dashboard-card">
      <div className="card-count">{value}</div>
      <div className="card-label">{label}</div>
    </div>
  );
};

const DashboardCards = ({ internships = [] }) => {
  const stats = useMemo(() => {
    const result = {
      total: internships.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0
    };

    internships.forEach((i) => {
      // Use currentStatus if available, otherwise fall back to status
      const status = i.currentStatus || i.status;
      
      if (status === "Applied") result.applied++;
      if (status === "Interview") result.interview++;
      if (status === "Offer") result.offer++;
      if (status === "Rejected") result.rejected++;
    });

    return result;
  }, [internships]);

  return (
    <div className="dashboard-cards-container">
      <Card label="Total" value={stats.total} />
      <Card label="Applied" value={stats.applied} />
      <Card label="Interview" value={stats.interview} />
      <Card label="Offer" value={stats.offer} />
      <Card label="Rejected" value={stats.rejected} />
    </div>
  );
};

export default DashboardCards;

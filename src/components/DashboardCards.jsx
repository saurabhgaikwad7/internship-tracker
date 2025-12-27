const DashboardCards = ({ internships }) => {
  const total = internships.length;
  const applied = internships.filter(i => i.status === "Applied").length;
  const interview = internships.filter(i => i.status === "Interview").length;
  const offer = internships.filter(i => i.status === "Offer").length;
  const rejected = internships.filter(i => i.status === "Rejected").length;

  const cards = [
    { label: "Total", count: total },
    { label: "Applied", count: applied },
    { label: "Interview", count: interview },
    { label: "Offers", count: offer },
    { label: "Rejected", count: rejected },
  ];

  return (
    <div className="dashboard-cards-container">
      {cards.map((card) => (
        <div
          key={card.label}
          className="dashboard-card"
        >
          <h3 className="card-count">{card.count}</h3>
          <p className="card-label">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;

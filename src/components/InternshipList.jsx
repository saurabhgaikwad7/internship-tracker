import InternshipItem from "./InternshipItem";

const InternshipList = ({ internships, onDelete }) => {
  if (internships.length === 0) {
    return <p className="no-internships-message">No internships added yet.</p>;
  }

  return (
    <div className="internship-list">
      {internships.map((internship) => (
        <InternshipItem
          key={internship.id}
          internship={internship}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InternshipList;

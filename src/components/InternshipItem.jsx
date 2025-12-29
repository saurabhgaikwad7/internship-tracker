const InternshipItem = ({ internship, onDelete }) => {
  return (
    <div className="internship-item">
      <h4 className="item-company">{internship.company}</h4>
      <p className="item-detail">Role: {internship.role}</p>
      <p className="item-detail">Status: {internship.currentStatus || internship.status}</p>
      <p className="item-detail">Applied: {internship.appliedDate}</p>
      {internship.notes && <p className="item-detail">Notes: {internship.notes}</p>}

      <button className="item-delete-button" onClick={() => onDelete(internship.id)}>Delete</button>
    </div>
  );
};

export default InternshipItem;

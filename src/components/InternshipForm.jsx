import { useState } from "react";

const InternshipForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...form,
      id: Date.now(),
    });

    setForm({
      company: "",
      role: "",
      status: "Applied",
      appliedDate: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="internship-form">
      <h3 className="form-title">Add Internship</h3>

      <input
        className="form-input"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />

      <input
        className="form-input"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />

      <select className="form-select" name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        className="form-input"
        type="date"
        name="appliedDate"
        value={form.appliedDate}
        onChange={handleChange}
      />

      <textarea
        className="form-textarea"
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <button className="form-button" type="submit">Add</button>
    </form>
  );
};

export default InternshipForm;

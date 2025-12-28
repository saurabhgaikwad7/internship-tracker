import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import InternshipForm from "../components/InternshipForm";
import { useInternships } from "../context/InternshipsContext";

const AddInternship = () => {
  const navigate = useNavigate();
  const { addInternship } = useInternships();

  const handleAdd = (newInternship) => {
    addInternship(newInternship);
    navigate("/"); // back to dashboard
  };

  return (
    <Layout title="Add Internship">
      <InternshipForm onAdd={handleAdd} />

      <button
        className="cancel-btn"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </Layout>
  );
};

export default AddInternship;

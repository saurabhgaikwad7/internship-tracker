import { createContext, useContext, useState } from "react";

const InternshipsContext = createContext();

export const InternshipsProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);

  const addInternship = (newInternship) => {
    setInternships([newInternship, ...internships]);
  };

  const deleteInternship = (id) => {
    setInternships(internships.filter((item) => item.id !== id));
  };

  return (
    <InternshipsContext.Provider value={{ internships, addInternship, deleteInternship }}>
      {children}
    </InternshipsContext.Provider>
  );
};

export const useInternships = () => useContext(InternshipsContext);
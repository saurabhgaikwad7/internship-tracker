import { createContext, useContext, useState } from "react";

const InternshipsContext = createContext(null);

export const InternshipsProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);

  // ✅ Add internship (safe update)
  const addInternship = (newInternship) => {
    setInternships((prev) => [newInternship, ...prev]);
  };

  // ✅ Delete internship (safe update)
  const deleteInternship = (id) => {
    setInternships((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ✅ UPDATE STATUS (FUNNEL-AWARE)
  const updateStatus = (id, newStatus) => {
    setInternships((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const stageKey = newStatus.toLowerCase();

        return {
          ...item,
          currentStatus: newStatus,
          stages: {
            ...item.stages,
            [stageKey]: {
              completed: true,
              date: new Date()
                .toISOString()
                .split("T")[0],
            },
          },
        };
      })
    );
  };

  return (
    <InternshipsContext.Provider
      value={{
        internships,
        addInternship,
        deleteInternship,
        updateStatus,
      }}
    >
      {children}
    </InternshipsContext.Provider>
  );
};

export const useInternships = () => {
  const context = useContext(InternshipsContext);

  if (!context) {
    throw new Error(
      "useInternships must be used within InternshipsProvider"
    );
  }

  return context;
};

const STORAGE_KEY = "internships";
const STORAGE_VERSION = 1;

export const loadInternships = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // 🛡️ Ensure array
    if (!Array.isArray(parsed)) return [];

    // 🛠️ Normalize old data (migration-safe)
    return parsed.map((item) => ({
      ...item,
      currentStatus: item.currentStatus || item.status || "Applied",
      stages: item.stages || {
        applied: {
          completed: true,
          date: item.appliedDate || null,
        },
        interview: { completed: false, date: null },
        offer: { completed: false, date: null },
        rejected: { completed: false, date: null },
      },
    }));
  } catch (error) {
    console.error("Failed to load internships:", error);
    return [];
  }
};

export const saveInternships = (internships) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(internships)
    );
  } catch (error) {
    console.error("Failed to save internships:", error);
  }
};

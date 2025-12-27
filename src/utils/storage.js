const STORAGE_KEY = "internships";

export const loadInternships = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveInternships = (internships) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(internships));
};

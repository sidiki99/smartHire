const KEY = "applications";

// Get all applications
export const getApplications = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

// Save applications
export const saveApplications = (apps) => {
  localStorage.setItem(KEY, JSON.stringify(apps));
};
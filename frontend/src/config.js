// In local development, this points at your backend running on localhost.
// When deployed, set VITE_API_URL in Netlify's environment variables to your
// deployed Northflank backend URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

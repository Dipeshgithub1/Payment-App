// Use relative API path - Vite proxy will forward requests to the backend
// In production, you would use the full URL
export const BASE_URL = import.meta.env.VITE_API_URL || "";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Create the base API URL
export const apiUrl = API_BASE_URL;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Pre-built common endpoints
export const API_ENDPOINTS = {
  // Auth
  SIGN_IN: buildApiUrl("auth/signin"),
  SIGN_OUT: buildApiUrl("auth/signout"),
  SIGNOUT: buildApiUrl("auth/signout"),
  CURRENT_USER: buildApiUrl("auth/currentuser"),

  // Main entities
  PROJECTS: buildApiUrl("projects"),
  PROJECTS_CREATE: buildApiUrl("projects/create"),
  SERVICES: buildApiUrl("services"),
  SERVICES_CREATE: buildApiUrl("services/create"),
  VACANCIES: buildApiUrl("vacancies"),
  VACANCIES_CREATE: buildApiUrl("vacancies/create"),
  CLIENTS: buildApiUrl("clients"),
  CLIENTS_CREATE: buildApiUrl("clients/create"),
  EMPLOYEE: buildApiUrl("employee"),
  EMPLOYEE_CREATE: buildApiUrl("employee/create"),

  // SIRC specific
  PROGRAMS: buildApiUrl("programs"),
  PROGRAMS_CREATE: buildApiUrl("programs/create"),
  RESEARCH: buildApiUrl("research"),
  RESEARCH_CREATE: buildApiUrl("research/create"),
  EQUIPMENT: buildApiUrl("equipment"),
  EQUIPMENT_CREATE: buildApiUrl("equipment/create"),
  SITES: buildApiUrl("sites"),
  SITES_CREATE: buildApiUrl("sites/create"),
};

// Helper function for dynamic endpoints
export const getApiUrl = (endpoint, params = {}) => {
  let url = buildApiUrl(endpoint);

  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
};

// Helper function for endpoints with ID
export const getApiUrlWithId = (endpoint, id) => {
  return buildApiUrl(`${endpoint}/${id}`);
};

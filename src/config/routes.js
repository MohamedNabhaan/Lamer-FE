// Route configuration for security by obscurity
const isDevelopment = import.meta.env.MODE === "development";

// Base routes - can be customized per environment
const ROUTE_CONFIG = {
  // Admin routes (obfuscated in production)
  ADMIN_LOGIN: isDevelopment ? "/admin-login" : "/management-portal-auth",
  ADMIN_DASHBOARD: isDevelopment ? "/admin" : "/l4m3r-secure-dashboard-panel",

  // Admin sub-routes
  PROJECTS: isDevelopment ? "projects" : "content-management",
  SERVICES: isDevelopment ? "services" : "service-offerings",
  TEAM: isDevelopment ? "team" : "personnel-management",
  CAREERS: isDevelopment ? "careers" : "position-listings",
  CLIENTS: isDevelopment ? "clients" : "client-registry",
  PROGRAMS: isDevelopment ? "programs" : "academic-programs",
  RESEARCH: isDevelopment ? "research" : "research-publications",
  EQUIPMENT: isDevelopment ? "equipment" : "laboratory-assets",

  // Actions
  CREATE: isDevelopment ? "create" : "new",
  EDIT: isDevelopment ? "edit" : "modify",

  // You can add more obfuscation layers here
  // For example, adding random strings or using hash-based routes
};

// Helper function to build admin routes
export const buildAdminRoute = (section, action = "", id = "") => {
  let route = `${ROUTE_CONFIG.ADMIN_DASHBOARD}/${
    ROUTE_CONFIG[section.toUpperCase()]
  }`;

  if (action) {
    route += `/${ROUTE_CONFIG[action.toUpperCase()]}`;
  }

  if (id) {
    route += `/${id}`;
  }

  return route;
};

// Helper function to get login route
export const getLoginRoute = () => ROUTE_CONFIG.ADMIN_LOGIN;

// Helper function to get dashboard route
export const getDashboardRoute = () => ROUTE_CONFIG.ADMIN_DASHBOARD;

// Export individual routes for convenience
export const ADMIN_ROUTES = {
  LOGIN: ROUTE_CONFIG.ADMIN_LOGIN,
  DASHBOARD: ROUTE_CONFIG.ADMIN_DASHBOARD,
  PROJECTS: buildAdminRoute("projects"),
  SERVICES: buildAdminRoute("services"),
  TEAM: buildAdminRoute("team"),
  CAREERS: buildAdminRoute("careers"),
  CLIENTS: buildAdminRoute("clients"),
  PROGRAMS: buildAdminRoute("programs"),
  RESEARCH: buildAdminRoute("research"),
  EQUIPMENT: buildAdminRoute("equipment"),
};

export default ROUTE_CONFIG;

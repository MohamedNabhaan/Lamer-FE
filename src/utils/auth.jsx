import { redirect } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

// Cache for user data to avoid repeated API calls
let userCache = {
  user: null,
  lastCheck: null,
  isValid: false,
};

// Cache timeout (5 minutes)
const CACHE_TIMEOUT = 5 * 60 * 1000;

/**
 * Enhanced authentication loader with caching and better error handling
 */
export async function checkAuthLoader() {
  try {
    // Check cache first to avoid unnecessary API calls
    const now = Date.now();
    if (
      userCache.isValid &&
      userCache.lastCheck &&
      now - userCache.lastCheck < CACHE_TIMEOUT
    ) {
      return userCache.user;
    }

    const response = await fetch(API_ENDPOINTS.CURRENT_USER, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
    });

    // Handle different response scenarios
    if (response.status === 401) {
      // Unauthorized - clear cache and redirect to login
      clearUserCache();
      return redirect("/l4m3r-management-portal-auth");
    }

    if (response.status === 403) {
      // Forbidden - user might be logged in but doesn't have admin access
      clearUserCache();
      throw new Error("Access denied. Admin privileges required.");
    }

    if (!response.ok) {
      // Other errors (500, 404, etc.)
      clearUserCache();
      console.error(
        "Authentication check failed:",
        response.status,
        response.statusText
      );
      return redirect("/l4m3r-management-portal-auth");
    }

    // Success - parse user data and cache it
    const userData = await response.json();

    // Update cache
    userCache = {
      user: userData,
      lastCheck: now,
      isValid: true,
    };

    return userData;
  } catch (error) {
    console.error("Authentication loader error:", error);
    clearUserCache();
    return redirect("/l4m3r-management-portal-auth");
  }
}

/**
 * Role-based access control loader
 */
export async function checkRoleAccess(requiredRoles = []) {
  const user = await checkAuthLoader();

  // If checkAuthLoader redirected, user will be null
  if (!user) {
    return null;
  }

  // If no specific roles required, just return user
  if (requiredRoles.length === 0) {
    return user;
  }

  // Check if user has required role(s)
  const userRoles = user.roles || [];
  const hasRequiredRole = requiredRoles.some(
    (role) => userRoles.includes(role) || userRoles.includes("super_admin")
  );

  if (!hasRequiredRole) {
    throw new Error(
      `Access denied. Required roles: ${requiredRoles.join(", ")}`
    );
  }

  return user;
}

/**
 * Higher-order function to create role-specific loaders
 */
export function createRoleLoader(requiredRoles = []) {
  return async (args) => {
    return await checkRoleAccess(requiredRoles);
  };
}

/**
 * Clear user cache (useful for logout or when authentication fails)
 */
export function clearUserCache() {
  userCache = {
    user: null,
    lastCheck: null,
    isValid: false,
  };
}

/**
 * Get cached user data without making API call
 */
export function getCachedUser() {
  return userCache.isValid ? userCache.user : null;
}

/**
 * Check if current user has specific permission
 */
export function hasPermission(permission) {
  const user = getCachedUser();
  if (!user || !user.permissions) return false;

  return (
    user.permissions.includes(permission) ||
    user.permissions.includes("all") ||
    (user.roles && user.roles.includes("super_admin"))
  );
}

/**
 * Enhanced logout function that clears cache
 */
export async function logout() {
  try {
    const response = await fetch(API_ENDPOINTS.SIGNOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
    });

    // Clear cache regardless of response
    clearUserCache();

    if (response.status === 201 || response.status === 200) {
      return redirect("/l4m3r-management-portal-auth");
    }

    // Even if logout fails on server, redirect to login
    return redirect("/l4m3r-management-portal-auth");
  } catch (error) {
    console.error("Logout error:", error);
    clearUserCache();
    return redirect("/l4m3r-management-portal-auth");
  }
}

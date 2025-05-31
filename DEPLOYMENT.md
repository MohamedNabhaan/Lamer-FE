# Production Deployment Guide

## Environment Configuration

This application now uses centralized API configuration. To deploy to production:

### 1. Create Environment Files

**Option A: Use the setup script (recommended):**

```bash
node setup-env.js
```

**Option B: Create manually:**

Create `.env.development`:

```
# Development Environment Configuration
VITE_API_BASE_URL=http://localhost:3000
```

Create `.env.production`:

```
# Production Environment Configuration
VITE_API_BASE_URL=https://your-production-api-domain.com
```

### 2. Build for Production

```bash
npm run build
```

### 3. Deploy

The built files in the `dist/` folder can be deployed to any static hosting service.

## Security Configuration - Obfuscated Routes

For enhanced security, the application uses obfuscated routes for admin access:

### Admin Access Routes

**Admin Login:**

- **Route:** `/l4m3r-management-portal-auth`
- **Purpose:** Secure admin authentication endpoint
- **Access:** Admin users only

**Admin Dashboard:**

- **Base Route:** `/l4m3r-secure-dashboard-panel`
- **Purpose:** Main admin panel access
- **Access:** Authenticated admin users only

### Admin Sub-Routes

All admin management routes are under the obfuscated base path:

- **Content Management:** `/l4m3r-secure-dashboard-panel/content-management`
- **Service Offerings:** `/l4m3r-secure-dashboard-panel/service-offerings`
- **Position Listings:** `/l4m3r-secure-dashboard-panel/position-listings`
- **Research Publications:** `/l4m3r-secure-dashboard-panel/research-publications`
- **Academic Programs:** `/l4m3r-secure-dashboard-panel/academic-programs`
- **Laboratory Assets:** `/l4m3r-secure-dashboard-panel/laboratory-assets`
- **Personnel Management:** `/l4m3r-secure-dashboard-panel/personnel-management`
- **Client Registry:** `/l4m3r-secure-dashboard-panel/client-registry`

### Route Configuration Files

The obfuscated routes are configured in:

- **`src/App.jsx`** - Main router configuration
- **`src/config/routes.js`** - Environment-based route definitions
- **`src/index.js`** - Navigation menu structure
- **`src/utils/auth.jsx`** - Authentication redirects

### Security Benefits

- **Obscurity Layer:** Non-obvious URLs make automated attacks harder
- **Reduced Discovery:** Admin panels are not easily discoverable
- **Targeted Access:** Only authorized users know the correct paths
- **Consistent Obfuscation:** All admin routes follow the same pattern

## API Configuration

The application now uses a centralized API configuration system located in `src/config/api.js`. This provides:

- Environment-based URL configuration
- Pre-built endpoint constants
- Helper functions for dynamic URL building
- Single source of truth for all API calls

## Migration Status

✅ **COMPLETED - All hardcoded localhost URLs have been migrated!**

### Files Updated:

**Utils:**

- ✅ `src/utils/service.jsx` - Updated to use `getApiUrl`
- ✅ `src/utils/project.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/utils/auth.jsx` - Updated to use `API_ENDPOINTS.CURRENT_USER`

**Main Pages:**

- ✅ `src/pages/SIRC/SIRC.jsx` - Updated to use `API_ENDPOINTS`
- ✅ `src/pages/Services/Services.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/pages/Clients/Clients.jsx` - Updated to use `API_ENDPOINTS.CLIENTS`
- ✅ `src/pages/Careers/Vacancies.jsx` - Updated to use `API_ENDPOINTS.VACANCIES`
- ✅ `src/pages/AboutUs/AboutUs.jsx` - Updated to use `API_ENDPOINTS.EMPLOYEE`

**Admin Pages:**

- ✅ `src/pages/AdminPages/AdminTeam/AdminTeam.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminServices/AdminServices.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminResearch/AdminResearch.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminProjects/AdminProjects.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminPrograms/AdminPrograms.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminEquipment/AdminEquipment.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminClients/AdminClients.jsx` - Updated to use API config
- ✅ `src/pages/AdminPages/AdminCareers/AdminCareers.jsx` - Updated to use API config

**Components:**

- ✅ `src/AdminDash.jsx` - Updated to use `API_ENDPOINTS.SIGNOUT`
- ✅ `src/components/AddForm.jsx` - Updated to use API config
- ✅ `src/components/EditForm.jsx` - Updated to use API config
- ✅ `src/components/VacancyEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/VacancyAddForm.jsx` - Updated to use `API_ENDPOINTS.VACANCIES_CREATE`
- ✅ `src/components/ServiceEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/ServiceAddForm.jsx` - Updated to use `API_ENDPOINTS.SERVICES_CREATE`
- ✅ `src/components/ResearchEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/ResearchAddForm.jsx` - Updated to use `API_ENDPOINTS.RESEARCH_CREATE`
- ✅ `src/components/ProgramEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/ProgramAddForm.jsx` - Updated to use `API_ENDPOINTS.PROGRAMS_CREATE`
- ✅ `src/components/EquipmentEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/EquipmentAddForm.jsx` - Updated to use `API_ENDPOINTS.EQUIPMENT_CREATE`
- ✅ `src/components/EmployeeEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/EmployeeAddForm.jsx` - Updated to use `API_ENDPOINTS.EMPLOYEE_CREATE`
- ✅ `src/components/ClientEditForm.jsx` - Updated to use `getApiUrlWithId`
- ✅ `src/components/ClientAddForm.jsx` - Updated to use `API_ENDPOINTS.CLIENTS_CREATE`

**Total Files Updated: 35+ files**

## API Endpoints Available

The following endpoints are pre-configured in `API_ENDPOINTS`:

### Authentication

- `SIGN_IN` - `/auth/signin`
- `SIGN_OUT` / `SIGNOUT` - `/auth/signout`
- `CURRENT_USER` - `/auth/currentuser`

### Main Entities

- `PROJECTS` - `/projects`
- `PROJECTS_CREATE` - `/projects/create`
- `SERVICES` - `/services`
- `SERVICES_CREATE` - `/services/create`
- `VACANCIES` - `/vacancies`
- `VACANCIES_CREATE` - `/vacancies/create`
- `CLIENTS` - `/clients`
- `CLIENTS_CREATE` - `/clients/create`
- `EMPLOYEE` - `/employee`
- `EMPLOYEE_CREATE` - `/employee/create`

### SIRC Specific

- `PROGRAMS` - `/programs`
- `PROGRAMS_CREATE` - `/programs/create`
- `RESEARCH` - `/research`
- `RESEARCH_CREATE` - `/research/create`
- `EQUIPMENT` - `/equipment`
- `EQUIPMENT_CREATE` - `/equipment/create`

## Helper Functions

### `getApiUrl(endpoint, params)`

For dynamic endpoints with query parameters:

```javascript
getApiUrl("services", { serviceCategory: "environmental" });
// Returns: https://api.domain.com/services?serviceCategory=environmental
```

### `getApiUrlWithId(endpoint, id)`

For endpoints with ID parameters:

```javascript
getApiUrlWithId("projects", "123");
// Returns: https://api.domain.com/projects/123
```

### `buildApiUrl(endpoint)`

For basic endpoint building:

```javascript
buildApiUrl("custom/endpoint");
// Returns: https://api.domain.com/custom/endpoint
```

## Production Deployment Steps

1. **Set up environment variables:**

   - Create `.env.production` with your production API URL
   - Ensure `VITE_API_BASE_URL` is set correctly

2. **Build the application:**

   ```bash
   npm run build
   ```

3. **Deploy the `dist/` folder** to your hosting service

4. **Configure your production API** to handle CORS and authentication

## Benefits of This Migration

- ✅ **Single source of truth** for all API URLs
- ✅ **Environment-based configuration** (dev/staging/prod)
- ✅ **Easy maintenance** - change URLs in one place
- ✅ **Type safety** with pre-built endpoints
- ✅ **Dynamic URL building** with helper functions
- ✅ **No more hardcoded URLs** throughout the codebase

The application is now fully ready for production deployment with proper environment-based API configuration!

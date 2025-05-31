#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Environment file contents
const devEnv = `# Development Environment Configuration
VITE_API_BASE_URL=http://localhost:3000
`;

const prodEnv = `# Production Environment Configuration
# Replace with your actual production API URL
VITE_API_BASE_URL=https://your-production-api-domain.com
`;

// Create .env.development
try {
  fs.writeFileSync(".env.development", devEnv);
  console.log("✅ Created .env.development");
} catch (error) {
  console.error("❌ Failed to create .env.development:", error.message);
}

// Create .env.production
try {
  fs.writeFileSync(".env.production", prodEnv);
  console.log("✅ Created .env.production");
} catch (error) {
  console.error("❌ Failed to create .env.production:", error.message);
}

console.log("\n📝 Next steps:");
console.log("1. Update .env.production with your actual production API URL");
console.log('2. Run "npm run build" to build for production');
console.log("3. Deploy the dist/ folder to your hosting service");
console.log("\n🎉 Your application is now ready for production deployment!");


# EcoCart Server Deployment Guide

This guide explains how to deploy the EcoCart backend server.

## Local Development

1. Install Node.js (v14 or higher)
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up Firebase:
   - Create a Firebase project
   - Generate a service account key
   - Save as `serviceAccountKey.json` in the server directory
5. Run the server:
   ```
   npm run dev
   ```

## Production Deployment Options

### Option 1: Traditional Hosting (VPS, Dedicated Server)

1. SSH into your server
2. Clone the repository
3. Navigate to the server directory
4. Install dependencies:
   ```
   npm install --production
   ```
5. Set up environment variables for API keys
6. Start the server with PM2:
   ```
   npm install -g pm2
   pm2 start index.js --name ecocart-api
   ```

### Option 2: Cloud Deployment (Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. Initialize a Git repository if not already done
4. Create a Heroku app:
   ```
   heroku create ecocart-api
   ```
5. Set environment variables:
   ```
   heroku config:set SERP_API_KEY=your_serp_api_key
   heroku config:set RAPID_API_KEY=your_rapid_api_key
   heroku config:set FIREBASE_SERVICE_ACCOUNT=base64_encoded_service_account_json
   ```
6. Deploy:
   ```
   git push heroku main
   ```

### Option 3: Serverless Deployment (Firebase Functions)

1. Set up Firebase CLI:
   ```
   npm install -g firebase-tools
   firebase login
   firebase init functions
   ```
2. Modify the server code to export a Firebase function
3. Deploy:
   ```
   firebase deploy --only functions
   ```

## Connecting Frontend to Backend API

After deploying your backend, update the `api.js` file in your frontend:

```javascript
// Replace with your actual deployed API URL
const API_BASE_URL = 'https://your-deployed-api.com';

// Update the API endpoints to use the deployed URL
static async searchSerpApi(query) {
    const response = await fetch(`${API_BASE_URL}/api/search/serpapi?q=${encodeURIComponent(query)}`);
    // ...
}
```

## Monitoring and Maintenance

- Set up logging with Winston or similar
- Configure monitoring alerts
- Implement regular backups of Firebase data
- Set up CI/CD for automated deployments

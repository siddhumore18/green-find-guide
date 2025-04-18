
# EcoCart Server

This is the backend server for the EcoCart application, providing API endpoints to search for eco-friendly products from various sources and classify them based on their eco-friendliness.

## Setup

1. Install dependencies:
```
cd server
npm install
```

2. Firebase Setup:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Generate a service account key from Project Settings > Service accounts
   - Save the key as `serviceAccountKey.json` in the server directory
   - Uncomment the credential line in the admin.initializeApp configuration

3. Start the server:
```
npm start
```

The server will run on port 3000 by default, or the port specified in the PORT environment variable.

## API Endpoints

- `GET /api/search?q={query}` - Search products from both SerpAPI and RapidAPI
- `GET /api/search/serpapi?q={query}` - Search products from SerpAPI only
- `GET /api/search/rapidapi?q={query}` - Search products from RapidAPI only
- `GET /api/alternatives/{productId}` - Get eco-friendly alternatives for a specific product

## Environment Variables

You can use environment variables for API keys and configuration:

- `PORT` - Server port (default: 3000)
- `SERP_API_KEY` - SerpAPI key
- `RAPID_API_KEY` - RapidAPI key
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON (base64 encoded)

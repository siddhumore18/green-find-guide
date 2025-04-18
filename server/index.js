
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase (using environment variables or a service account file)
try {
  admin.initializeApp({
    // You'll need to provide Firebase credentials
    // For development, you can use a service account key file
    // credential: admin.credential.cert(require('./serviceAccountKey.json'))
  });
} catch (error) {
  console.log('Firebase admin initialization error:', error);
}

// Reference to Firestore
const db = admin.firestore ? admin.firestore() : null;

// Middleware
app.use(cors());
app.use(express.json());

// SerpAPI configuration
const SERP_API_KEY = '6b16fa341e1a54c7761651ac712a26c4999fc0df822979cbaecc6c236f82ead2';
const SERP_API_URL = 'https://serpapi.com/search';

// RapidAPI configuration
const RAPID_API_KEY = '57a53c70eamsh2c9931ffc9abd30p1fadfbjsna3debd68e472';
const RAPID_API_HOST = 'real-time-amazon-data.p.rapidapi.com';
const RAPID_API_URL = 'https://real-time-amazon-data.p.rapidapi.com/search';

// Cache for product data
const productCache = {};

// Utility function to calculate eco-score
function calculateEcoScore(product) {
  const keywords = [
    'eco', 'sustainable', 'organic', 'recycled', 'biodegradable',
    'natural', 'renewable', 'green', 'environmentally friendly'
  ];
  
  const productText = `${product.title || ''} ${product.description || ''}`.toLowerCase();
  const matchCount = keywords.filter(keyword => productText.includes(keyword)).length;
  return Math.min(Math.max(5 + matchCount, 1), 10);
}

// Utility function to generate eco-badges
function generateEcoBadges(product) {
  const badges = [];
  const productText = `${product.title || ''} ${product.description || ''}`.toLowerCase();

  const badgeRules = {
    'recyclable': ['recycle', 'recyclable'],
    'biodegradable': ['biodegradable', 'compostable', 'organic'],
    'sustainable': ['sustainable', 'eco-friendly', 'green'],
    'plastic-free': ['plastic-free', 'zero waste']
  };

  for (const [badge, keywords] of Object.entries(badgeRules)) {
    if (keywords.some(keyword => productText.includes(keyword))) {
      badges.push(badge);
    }
  }

  return badges;
}

// Format SerpAPI results
function formatSerpApiResults(results) {
  if (!results) return [];
  return results.map(item => ({
    id: item.product_id || Math.random().toString(36).substr(2, 9),
    name: item.title,
    price: item.price,
    image: item.thumbnail,
    description: item.snippet || 'No description available',
    rating: calculateEcoScore(item),
    badges: generateEcoBadges(item),
    source: 'serpapi'
  }));
}

// Format RapidAPI results
function formatRapidApiResults(results) {
  if (!results) return [];
  return results.map(item => ({
    id: item.asin || Math.random().toString(36).substr(2, 9),
    name: item.title,
    price: item.price?.current_price || 'Price not available',
    image: item.thumbnail,
    description: item.description || 'No description available',
    rating: calculateEcoScore(item),
    badges: generateEcoBadges(item),
    source: 'rapidapi'
  }));
}

// Endpoint to search products from SerpAPI
app.get('/api/search/serpapi', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Check cache first
    const cacheKey = `serpapi-${query}`;
    if (productCache[cacheKey]) {
      console.log('Returning cached SerpAPI results for:', query);
      return res.json(productCache[cacheKey]);
    }

    // Store search query in Firebase if available
    if (db) {
      await db.collection('searches').add({
        query,
        source: 'serpapi',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    const params = {
      api_key: SERP_API_KEY,
      engine: 'google_shopping',
      q: query,
      num: 10
    };

    const response = await axios.get(SERP_API_URL, { params });
    const formattedResults = formatSerpApiResults(response.data.shopping_results);
    
    // Save to cache
    productCache[cacheKey] = formattedResults;
    
    // Store products in Firebase if available
    if (db) {
      formattedResults.forEach(async (product) => {
        await db.collection('products').doc(product.id).set({
          ...product,
          query,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });
    }

    res.json(formattedResults);
  } catch (error) {
    console.error('SerpAPI Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from SerpAPI' });
  }
});

// Endpoint to search products from RapidAPI
app.get('/api/search/rapidapi', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Check cache first
    const cacheKey = `rapidapi-${query}`;
    if (productCache[cacheKey]) {
      console.log('Returning cached RapidAPI results for:', query);
      return res.json(productCache[cacheKey]);
    }

    // Store search query in Firebase if available
    if (db) {
      await db.collection('searches').add({
        query,
        source: 'rapidapi',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    const options = {
      method: 'GET',
      url: RAPID_API_URL,
      params: { query },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    };

    const response = await axios.request(options);
    const formattedResults = formatRapidApiResults(response.data.products);
    
    // Save to cache
    productCache[cacheKey] = formattedResults;
    
    // Store products in Firebase if available
    if (db) {
      formattedResults.forEach(async (product) => {
        await db.collection('products').doc(product.id).set({
          ...product,
          query,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });
    }

    res.json(formattedResults);
  } catch (error) {
    console.error('RapidAPI Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from RapidAPI' });
  }
});

// Combined search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Check combined cache first
    const cacheKey = `combined-${query}`;
    if (productCache[cacheKey]) {
      console.log('Returning cached combined results for:', query);
      return res.json(productCache[cacheKey]);
    }

    // Store search query in Firebase if available
    if (db) {
      await db.collection('searches').add({
        query,
        source: 'combined',
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Make parallel requests to both APIs
    const [serpApiResponse, rapidApiResponse] = await Promise.all([
      axios.get(`${req.protocol}://${req.get('host')}/api/search/serpapi?q=${encodeURIComponent(query)}`),
      axios.get(`${req.protocol}://${req.get('host')}/api/search/rapidapi?q=${encodeURIComponent(query)}`)
    ]);

    // Combine and deduplicate results
    const combinedResults = [...serpApiResponse.data, ...rapidApiResponse.data];
    const uniqueProducts = [...new Map(combinedResults.map(item => [item.id, item])).values()];
    
    // Save to cache
    productCache[cacheKey] = uniqueProducts;
    
    res.json(uniqueProducts);
  } catch (error) {
    console.error('Combined search error:', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
});

// Get eco-friendly alternatives
app.get('/api/alternatives/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Look up product in Firebase if available
    if (db) {
      const productDoc = await db.collection('products').doc(productId).get();
      
      if (!productDoc.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      const product = productDoc.data();
      
      // Find similar products with higher eco-score
      const snapshot = await db.collection('products')
        .where('badges', 'array-contains-any', product.badges)
        .where('rating', '>', product.rating)
        .limit(5)
        .get();
      
      const alternatives = [];
      snapshot.forEach(doc => {
        alternatives.push(doc.data());
      });
      
      return res.json(alternatives);
    }
    
    // If Firebase not available, use in-memory cache
    const allProducts = Object.values(productCache).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Find alternatives with higher eco-score and at least one matching badge
    const alternatives = allProducts
      .filter(p => 
        p.id !== productId && 
        p.rating > product.rating &&
        p.badges.some(badge => product.badges.includes(badge))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
    
    res.json(alternatives);
  } catch (error) {
    console.error('Get alternatives error:', error);
    res.status(500).json({ error: 'Failed to fetch alternatives' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

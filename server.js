const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Proxy endpoint for Earnware API
app.get('/api/campaigns', async (req, res) => {
  try {
    const userId = '8f1643cd582ca5b533b9304abc7fbf98';
    const apiKey = '5bb91bc4-bdd54b9b-90b8e7f6-1f19b335-a7ec15f9';
    
    const response = await fetch(`https://papi.earnware.com/v1/${userId}/campaigns`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns', details: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
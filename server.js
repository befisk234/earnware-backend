const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/campaigns', async (req, res) => {
  try {
    const response = await fetch('https://api.earnware.com/v1/campaigns', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 5bb91bc4-bdd54b9b-90b8e7f6-1f19b335-a7ec15f9',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Earnware-Backend-Proxy'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Earnware error: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

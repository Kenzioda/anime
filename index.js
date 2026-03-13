const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your website can talk to this API
app.use(cors());

// Root route for Health Check (This fixes the Back4App timeout error)
app.get('/', (req, res) => {
    res.status(200).json({ status: "API is running smoothly", timestamp: new Date() });
});

// Proxy route to fetch anime data
// This matches the URL pattern your frontend expects: /api/v2/hianime
app.get('/api/v2/hianime', async (req, res) => {
    try {
        // Replace this URL with the actual source URL of the anime data if you have a specific provider
        // For now, this is a placeholder that returns a successful response structure
        const response = await axios.get('https://goanime-63i5ka1k.b4a.run/api/v2/hianime');
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch anime data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
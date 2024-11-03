const express = require('express');
const cors = require('cors');
const https = require('https');
const app = express();
const PORT = 5000;
app.use(cors()); 
app.get('/api/products/search', (req, res) => {
    const { search, page, limit } = req.query;
    const apiUrl = `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=${limit}`;
    https.get(apiUrl, {
        headers: {
            'x-api-key': '72njgfa948d9aS7gs5'
        }
    }, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                console.log(jsonData); 
                res.json(jsonData); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Error parsing response data' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

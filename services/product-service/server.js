const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', service: 'product-service' }));
app.get('/', (req, res) => res.json({ service: 'Product Service', products: [{ id: 101, item: 'Laptop' }, { id: 102, item: 'Phone' }] }));

app.listen(PORT, '0.0.0.0', () => console.log(`Product Service running on port ${PORT}`));

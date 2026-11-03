const express = require('express');
const app = express();
const PORT = process.env.PORT || 5003;

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', service: 'order-service' }));
app.get('/', (req, res) => res.json({ service: 'Order Service', orders: [{ orderId: 'ORD-901', amount: 1200 }] }));

app.listen(PORT, '0.0.0.0', () => console.log(`Order Service running on port ${PORT}`));

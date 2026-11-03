const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', service: 'user-service' }));
app.get('/', (req, res) => res.json({ service: 'User Service', users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }));

app.listen(PORT, '0.0.0.0', () => console.log(`User Service running on port ${PORT}`));

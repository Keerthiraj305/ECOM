const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const ecomRoutes = require('./routes/ecomRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false })); 
app.use(bodyParser.json());

// API Routes
app.use('/api', ecomRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'E-commerce backend is running!' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`E-commerce Backend running on port ${PORT}...`);
});
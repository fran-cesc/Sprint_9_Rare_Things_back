const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const https = require('https');

require('dotenv').config();
const app = express();


const API_URL = process.env.API_URL || 'https://rare-things-back.onrender.com/things';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://rare-things.vercel.app';



// CORS middleware
app.use(cors({
    origin: CORS_ORIGIN, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/things'));
app.use(require('./routes/votes'));
app.use(require('./routes/comments'));

// Image static server
app.use(express.static('img_uploads'));

// Initialize server
const port = process.env.PORT || 10000; 
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});


// Auto-ping every 10 min to keep server awake
if (process.env.ENABLE_SELF_PING === 'true') {
    setInterval(() => {
        https.get(API_URL, (resp) => {
            console.log(`self-ping status: ${resp.statusCode}`);
        }).on('error', (error) => {
            console.error('self-ping failed', error.message);
        });
    }, 10 * 60 * 1000);
}


module.exports = app;

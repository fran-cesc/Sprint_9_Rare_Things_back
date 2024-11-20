const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const https = require('https');
const API_URL = 'https://rare-things-back.onrender.com/things';


require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://rare-things.vercel.app', 
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
app.listen(process.env.PORT || 10000, () => {
    console.log(`Server running at port ${process.env.PORT || 10000}`);
});

// Auto-ping every 5 min to keep server awake
setInterval(()=> {
https.get(API_URL, (resp) => {
    console.log(`self-ping status: ${resp.statusCode}`);
}).on('error', (error) => {
    console.error('self-ping failed', error.message);
});
}, 5*60*1000);


module.exports = app;

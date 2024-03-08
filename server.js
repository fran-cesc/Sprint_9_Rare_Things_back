const express = require('express');
const cors = require('cors');
const fs = require('node:fs');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: true, limit: '5mb'}));

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/things'));
app.use(require('./routes/votes'));

// Image static server
app.use(express.static('img_uploads'));

// Initialize server
app.listen(process.env.PORT || 3000,() => {
    console.log(`Server running at port ${process.env.PORT}`);
});

module.exports = app;
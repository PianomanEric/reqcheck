const PORT = 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Set up environment variables
dotenv.config();

// Path to the react build folder
const build = path.join(__dirname, '..', 'client', 'build');

// Middleware
app.use(express.static(build));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// API routes
require('./routes')(app);

// Any routes not handled above will serve the react app
app.get('*', (req, res) => {
    res.sendFile(path.join(build, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
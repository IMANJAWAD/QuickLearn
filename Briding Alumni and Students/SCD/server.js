// server.js
const express = require('express');
const bodyParser = require('body-parser');
const alumniRoutes = require('./routes/alumniRoutes');

// Initialize app
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up routes
app.use('/api/alumni', alumniRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

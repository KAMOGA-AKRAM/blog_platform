const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Import routes
const postsRoutes = require('./routes/posts');

// Use the routes 
app.use('/', postsRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


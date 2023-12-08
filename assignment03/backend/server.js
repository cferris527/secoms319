const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost/my-mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Express middleware
app.use(express.json());

// Your API routes go here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require('path');

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
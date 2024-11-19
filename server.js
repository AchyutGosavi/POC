const express = require('express');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Interview Preparation Hub is running at http://localhost:${port}`);
});

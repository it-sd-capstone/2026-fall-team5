const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Allow the server to read JSON data
app.use(express.json());

// Connect the frontend to the server
app.use(express.static(path.join(__dirname, '../public')));

// Start the server
app.listen(PORT, () => {
    console.log(`MealDeal is running at http://localhost:${PORT}`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Load cars data from the JSON file
const carsFilePath = path.join(__dirname, 'cars.json');
let carsData = [];

fs.readFile(carsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading cars.json file:', err);
    return;
  }
  carsData = JSON.parse(data);
});

// Route to get all cars
app.get('/api/cars', (req, res) => {
  res.json(carsData);
});

// Route to get a car by title
app.get('/api/cars/:title', (req, res) => {
  const title = req.params.title;
  const car = carsData.find(c => c.title.toLowerCase() === title.toLowerCase());
  if (car) {
    res.json(car);
  } else {
    res.status(404).send('Car not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



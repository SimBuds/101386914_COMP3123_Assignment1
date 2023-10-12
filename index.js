// Entry point of the application
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Setup express app
const app = express();

// Connect to MongoDB which is running locally
mongoose.connect('mongodb://localhost:27017/AssignmentOneDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware to parse the request body
app.use(bodyParser.json());

// Setup Routes
app.use('/api/v1/user/', userRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
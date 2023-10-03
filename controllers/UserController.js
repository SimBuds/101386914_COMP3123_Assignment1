const User = require('../models/User');  // Importing the User model
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing

const UserController = {
  async register(req, res) {
    try {
      // Validate request data
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'All fields are required' });
      }

      // Check if a user with the same email or username already exists
      const userExists = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
      if (userExists) {
        return res.status(409).send({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });

      // Save the new user to the database
      await user.save();

      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  },

  // Method for handling user login
  async login(req, res) {
    try {
      // Validate request data
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Both email and password are required' });
      }

      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: 'Sorry User not found' });
      }

      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: 'Incorrect password, please try again.' });
      }

      res.status(200).send({ message: 'Thank you login successful' });
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  }
};

module.exports = UserController;
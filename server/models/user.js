const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Generate JWT token for user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_KEY, { expiresIn: '2d' });
  return token;
};

const User = mongoose.model('User', userSchema);

// Define validation schema for user input
const validateUser = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label('FirstName'),
    lastName: joi.string().required().label('LastName'),
    email: joi.string().email().required().label('Email'),
    password: PasswordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = { User, validateUser };

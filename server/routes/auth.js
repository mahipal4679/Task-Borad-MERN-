const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { error } = (req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'Email or password is incorrect.' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send({ message: 'Email or password is incorrect.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header('x-auth-token', token).status(200).send({ message: 'Logged in successfully.' });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error.' });
  }
});

function Validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.Validate(req);
}

module.exports = router;

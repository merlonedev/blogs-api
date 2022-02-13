const jwt = require('jsonwebtoken');
require('dotenv').config();

const newToken = (newUser) => jwt.sign(newUser, process.env.JWT_SECRET);

const validateToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    return error;
  }
};

module.exports = { newToken, validateToken };
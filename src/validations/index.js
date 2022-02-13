const validateNewUser = require('./validateNewUser');
const validateLogin = require('./validateLogin');
const validateCategories = require('./validateCategories');
const validatePost = require('./validatePost');
const { newToken, validateToken } = require('./jwt');

module.exports = {
  validateNewUser,
  validateLogin,
  validateToken,
  validateCategories,
  validatePost,
  newToken,
};
const jsonwebtoken = require('jsonwebtoken');
const { validateToken } = require('../validations');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const isValidToken = validateToken(authorization);
  if (isValidToken.message) return res.status(401).json({ message: 'Expired or invalid token' });

  const decode = jsonwebtoken.verify(authorization, process.env.JWT_SECRET);
  console.log(decode);
  req.user = decode;

  next();
};
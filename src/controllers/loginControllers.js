const express = require('express');

const router = express.Router();

const { User } = require('../models');
const { newToken, validateLogin } = require('../validations');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = validateLogin.validate({ email, password });
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const userExists = await User.findAll({ where: { email } });
    if (userExists.length <= 0) return res.status(400).json({ message: 'Invalid fields' });

    const user = { ...userExists[0].dataValues };

    const tokenJwt = newToken(user);

    return res.status(200).json({ token: tokenJwt });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
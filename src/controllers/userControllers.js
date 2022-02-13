const express = require('express');
const tokenMW = require('../middlewares/tokenMW');

const router = express.Router();

const { User } = require('../models');
const { validateNewUser, newToken } = require('../validations');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const validation = validateNewUser.validate({ displayName, email, password, image });

    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const userExists = await User.findAll({ where: { email } });

    if (userExists.length > 0) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = { displayName, email, password, image };

    await User.create(newUser);

    const tokenJwt = newToken(newUser);

    res.status(201).json({ token: tokenJwt });
  } catch (error) {
    console.error(error.message);
    return res.status(500).end();
  }
});

router.get('/', tokenMW, async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length <= 0) return res.status(400).json({ message: 'No user found' });

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).end();
  }
});

router.get('/:id', tokenMW, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;
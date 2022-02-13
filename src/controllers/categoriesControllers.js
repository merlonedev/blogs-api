const express = require('express');
const tokenMW = require('../middlewares/tokenMW');

const router = express.Router();

const { Category } = require('../models');
const { validateCategories } = require('../validations');

router.post('/', tokenMW, async (req, res) => {
  try {
    const { name } = req.body;

    const isValidCategory = validateCategories.validate({ name });
    if (isValidCategory.error) { 
      return res.status(400).json({ message: isValidCategory.error.details[0].message }); 
    }

    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error.message);
    res.status(500).end();
  }
});

router.get('/', tokenMW, async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length <= 0) return res.status(400).json({ message: 'No category found' });

    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;

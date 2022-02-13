const express = require('express');

const router = express.Router();

const { BlogPost, User, Category } = require('../models');
const tokenMW = require('../middlewares/tokenMW');

const { validatePost } = require('../validations');

router.post('/', tokenMW, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;

    const isValidPost = validatePost.validate({ title, content, categoryIds });
    if (isValidPost.error) {
      return res.status(400).json({ message: isValidPost.error.details[0].message });
    }

    const findCategory = await Category.findAll({ where: { id: categoryIds } });
    if (findCategory.length <= 0) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const categories = await BlogPost.create({ title, content, categoryIds, userId: id });
    return res.status(201).json(categories);
  } catch (e) {
    return res.status(500).end();
  }
});

router.get('/', tokenMW, async (req, res) => {
  try {
    const allPosts = await BlogPost.findAll(
      { 
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
    );
    return res.status(200).json(allPosts);
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;
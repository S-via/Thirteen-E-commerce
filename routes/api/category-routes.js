const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    // be sure to include its associated Products
    const categoryData = await Category.findAll(
      {
        include: [{
          model: Product,
          required: false
        }]
      }
    );
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id,
      {
        include: [{
          model: Product,
          required: false
        }]
      });
    if (!categoryData) {
      res.status(404).json({ messegae: 'no location with id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name:req.body.category_name,
    });

    if (!categoryData) {
      res.status(404).json({ message: 'new category added' });
      return;
    }
    res.status(200).json(CategoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name},
      {where:{
        id: req.params.id,
      },
    }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'no category' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'location removed' });
      return;

    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

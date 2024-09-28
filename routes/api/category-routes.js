const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    // be sure to include its associated Products
    const locationData = await Category.findAll(
      {
        include: [{
          model: Product,
          required: false
        }]
      }
    );
    res.status(200).json(locationData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const locationData = await Category.findByPk(req.params.id,
      {
        include: [{
          model: Product,
          required: false
        }]
      });
    if (!locationData) {
      res.status(404).json({ messegae: 'no location with id' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const locationData = await Category.create(req.body)

    if (!locationData) {
      res.status(404).json({ message: 'new category added' });
      return;
    }
    res.status(200).json(locationData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const locationData = await Category.update(req.params.id)

    if (!locationData) {
      res.status(404).json({ message: 'category has been updated' });
      return;
    }
    res.status(200).json(locationData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const locationData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!locationData) {
      res.status(404).json({ message: 'location removed' });
      return;

    }
    res.status(200).json(locationData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

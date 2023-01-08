const ProductRouter = require('express').Router();
const Product = require('../Models/product');

// Get All Products
ProductRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific product
ProductRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Product
ProductRouter.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body;

  const productEntity = new Product({
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  });

  try {
    await productEntity.save();
    res.json(productEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Product
ProductRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description, price, quantity } = req.body;

  try {
    const product = await Product.findById(id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Product
ProductRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    await product.deleteOne();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = ProductRouter;

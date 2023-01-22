const ProductRouter = require('express').Router();
const Product = require('../Models/product');
const {
  validateStringField,
  validatePrice,
  validateQuantity,
} = require('../Validators');
const { isEmpty } = require('../Utilities');

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

  const errorMessages = [];

  const nameValidation = validateStringField(name, 'name');
  if (nameValidation.isInValid) {
    errorMessages.push(nameValidation.errorMessage);
  }

  const descriptionValidation = validateStringField(description, 'description');
  if (descriptionValidation.isInValid) {
    errorMessages.push(descriptionValidation.errorMessage);
  }

  const priceValidation = validatePrice(price);
  if (priceValidation.isInvalid) {
    errorMessages.push(priceValidation.errorMessage);
  }

  const quantityValidation = validateQuantity(quantity);
  if (quantityValidation.isInvalid) {
    errorMessages.push(quantityValidation.errorMessage);
  }

  if (errorMessages.length > 0) {
    res.status(400).json({ errors: errorMessages });
    return;
  }

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

  if (isEmpty(id)) {
    res.status(400).json({ error: 'Id is not provided' });
    return;
  }

  const { name, description, price, quantity } = req.body;

  const errorMessages = [];

  const nameValidation = validateStringField(name, 'name');
  if (nameValidation.isInValid) {
    errorMessages.push(nameValidation.errorMessage);
  }

  const descriptionValidation = validateStringField(description, 'description');
  if (descriptionValidation.isInValid) {
    errorMessages.push(descriptionValidation.errorMessage);
  }

  const priceValidation = validatePrice(price);
  if (priceValidation.isInvalid) {
    errorMessages.push(priceValidation.errorMessage);
  }

  const quantityValidation = validateQuantity(quantity);
  if (quantityValidation.isInvalid) {
    errorMessages.push(quantityValidation.errorMessage);
  }

  if (errorMessages.length > 0) {
    res.status(400).json({ errors: errorMessages });
    return;
  }

  try {
    const product = await Product.findById(id);

    if(!product) {
      res.status(400).json({error: 'Product not found'});
      return;
    }

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

  if(isEmpty(id)) {
    res.status(400).json({error: 'Id is not provided'});
    return;
  }

  try {
    const product = await Product.findById(id);

    if(!product) {
      res.status(400).json({error: 'Product not found'});
      return;
    }

    await product.deleteOne();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = ProductRouter;

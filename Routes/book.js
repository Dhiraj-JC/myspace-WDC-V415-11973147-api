const BookRouter = require('express').Router();
const Book = require('../Models/book');

// Get all books
BookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Specific Book
BookRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Book.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Book
BookRouter.post('/', async (req, res) => {
  const { name, description, authorName, publishedYear } = req.body;

  const bookEntity = new Book({
    name: name,
    description: description,
    authorName: authorName,
    publishedYear: publishedYear,
  });

  try {
    await bookEntity.save();
    res.json(bookEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Book
BookRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description, authorName, publishedYear } = req.body;

  try {
    const book = await Book.findById(id);

    book.name = name;
    book.description = description;
    book.authorName = authorName;
    book.publishedYear = publishedYear;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Book
BookRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    await book.deleteOne();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = BookRouter;

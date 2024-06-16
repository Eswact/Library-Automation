const db = require("../models");
const books = db.books;

// Get all books from the database.
const findAll = async (req, res) => {
  try {
    const booksData = await books.find();
    res.json(booksData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving books." });
  }
};

// Get book with an id
const findOne = async (req, res) => {
  const _id = req.params.id;
  try {
    const booksData = await books.find();
    const response = booksData.find((item) => item._id == _id);
    (!response) 
      ? res.status(404).send({ message: "Not found book with id " + _id })
      : res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving book with id=" + _id });
  }
};

// Create and save a new book
const create = async (req, res) => {
  try {
    const newBook = new books(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the book." });
  }
};

// Update a book by the id in the request
const update = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateBookData = req.body;
    const updatedBook = await books.findOneAndUpdate(
      { _id: bookId },
      { $set: updateBookData },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating book."
    });
  }
};

// Delete a book with the specified id in the request
const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const bookDeleteResult = await books.deleteOne({ _id: id });
    (bookDeleteResult.deletedCount === 0)
      ? res.status(404).send({ message: "Not found book with id " + id })
      : res.status(200).send({ message: "book deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Could not delete book with id=" + id });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne
};

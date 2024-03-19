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

module.exports = {
  findAll,
  findOne
};

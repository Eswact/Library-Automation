const db = require("../models");
const books = db.books;

// Get all books from the database.
const findAll = async (req, res, next) => {
  try {
    const booksData = await books.find();
    res.json(booksData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll
};

const db = require("../models");
const books = db.books;

// Get all books from the database.
exports.findAll = async (req, res) => {
  try {
    const booksData = await books.find();
    res.json(booksData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving books."
    });
  }
};
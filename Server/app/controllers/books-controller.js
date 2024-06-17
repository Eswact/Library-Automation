const db = require("../models");
const books = db.books;
const rentRequests = db.rentRequests;
const borrowedBooks = db.borrowedBooks;

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

// Get all request from the database.
const getRequests = async (req, res) => {
  try {
    const requestData = await rentRequests.find();
    res.json(requestData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving requests." });
  }
};

// Create and save a new request
const createRequest = async (req, res) => {
  try {
    const existingRequest = await rentRequests.findOne({
      bookId: req.body.bookId,
      userId: req.body.userId
    });
    if (existingRequest) {
      return res.status(400).send({ message: "Bu kitap için zaten istek gönderildi." });
    }

    const newRequest = new rentRequests(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the request." });
  }
};


const acceptRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await rentRequests.findById(requestId);
    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    // BorrowedBooks
    const newBorrowedBook = new borrowedBooks({
      userId: request.userId,
      bookId: request.bookId,
      state: true,
      rentStart: new Date(),
      rentEnd: null
    });
    await newBorrowedBook.save();

    // Aynı bookId'ye sahip tüm istekleri sil
    await rentRequests.deleteMany({ bookId: request.bookId });

    // isBorrowed
    const updatedBook = await books.findOneAndUpdate(
      { _id: request.bookId },
      { $set: { isBorrowed: true } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send({ message: "Request accepted and book borrowed successfully", borrowedBook: newBorrowedBook });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while accepting the request." });
  }
};

const rejectRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const requestDeleteResult = await rentRequests.deleteOne({ _id: requestId });
    (requestDeleteResult.deletedCount === 0)
      ? res.status(404).send({ message: "Not found book with id " + id })
      : res.status(200).send({ message: "book deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Could not delete book with id=" + id });
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooksData = await borrowedBooks.find();
    res.json(borrowedBooksData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving borrowed books." });
  }
};

const endBorrow = async (req, res) => {
  const borrowId = req.params.id;
  try {
    const updatedBorrowedBook = await borrowedBooks.findOneAndUpdate(
      { _id: borrowId },
      { $set: { state: false, rentEnd: new Date() } },
      { new: true }
    );

    if (!updatedBorrowedBook) {
      return res.status(404).send({ message: 'Borrowed book not found' });
    }

    // isBorrowed 
    const updatedBook = await books.findOneAndUpdate(
      { _id: updatedBorrowedBook.bookId },
      { $set: { isBorrowed: false } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send({ message: "Borrow ended successfully", borrowedBook: updatedBorrowedBook });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while ending the borrow." });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  createRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  getBorrowedBooks,
  endBorrow
};  

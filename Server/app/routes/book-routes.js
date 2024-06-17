const books = require("../controllers/books-controller.js");
const endpoints= [
    { method: "get", path: "published", func: books.findAll },
    { method: "post", path: "find/:id", func: books.findOne },
    { method: "post", path: "create", func: books.create },
    { method: "post", path: "update/:id", func: books.update },
    { method: "post", path: "delete/:id", func: books.deleteOne },
    { method: "post", path: "createRequest", func: books.createRequest },
    { method: "get", path: "requests", func: books.getRequests },
    { method: "post", path: "acceptRequest/:id", func: books.acceptRequest },
    { method: "post", path: "rejectRequest/:id", func: books.rejectRequest },
    { method: "get", path: "borrowedBooks", func: books.getBorrowedBooks },
    { method: "post", path: "endBorrow/:id", func: books.endBorrow }
]

module.exports = endpoints;
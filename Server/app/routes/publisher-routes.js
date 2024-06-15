const publishers = require("../controllers/publishers-controller.js");
const endpoints= [
    { method: "get", path: "published", func: publishers.findAll },
    { method: "post", path: "create", func: publishers.createPublisher },
    { method: "post", path: "update", func: publishers.updatePublisher },
    { method: "post", path: "delete/:id", func: publishers.deletePublisher },
]

module.exports = endpoints;
const publishers = require("../controllers/publishers-controller.js");
const endpoints= [
    { method: "get", path: "published", func: publishers.findAll },
]

module.exports = endpoints;
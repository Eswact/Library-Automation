const writers = require("../controllers/writers-controller.js");
const endpoints= [
    { method: "get", path: "published", func: writers.findAll },
]

module.exports = endpoints;
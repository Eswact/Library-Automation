const writers = require("../controllers/writers-controller.js");
const endpoints= [
    { method: "get", path: "published", func: writers.findAll },
    { method: "post", path: "create", func: writers.createWriter },
    { method: "post", path: "update", func: writers.updateWriter },
    { method: "post", path: "delete/:id", func: writers.deleteWriter },
]

module.exports = endpoints;
const books = require("../controllers/admin-controller.js");
const endpoints= [  
    { method: "postSingleFile", path: "addBannerImage", func: books.addBannerImage },
    { method: "postSingleFile", path: "addCompanyImage", func: books.addCompanyImage },
]

module.exports = endpoints;
const admin = require("../controllers/admin-controller.js");
const endpoints= [  
    { method: "postSingleFile", path: "addImage2Upload", func: admin.addImage2Upload },
]

module.exports = endpoints;
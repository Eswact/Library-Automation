const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const bookRoutes = require("./book-routes");
const categoryRoutes = require("./category-routes");
const userRoutes = require("./user-routes");
const homeRoutes = require("./home-routes");
const writerRoutes = require("./writer-routes");
const publisherRoutes = require("./publisher-routes");
const companyRoutes = require("./company-routes");
const adminRoutes = require("./admin-routes");

chooseMethod = (method, path, func) => { 
    switch (method) {
        case "get":
            router.get(path, func);
            break;
        case "post":
            router.post(path, func);
            break;
        case "postSingleFile":
            router.post(path, upload.single('file'), func);
            break;
        case "put":
            router.put(path, func);
            break;
        case "delete":
            router.delete(path, func);
            break;
        default:
            break;
    }
}

bookRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/books/${path}`, func);
});
categoryRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/categories/${path}`, func);
});
userRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/users/${path}`, func);
});
homeRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/home/${path}`, func);
});
writerRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/writers/${path}`, func);
});
publisherRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/publishers/${path}`, func);
});
companyRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/company/${path}`, func);
});
adminRoutes.forEach(({ method, path, func }) => {
    chooseMethod(method, `/admin/${path}`, func);
});

module.exports = router;
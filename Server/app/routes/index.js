const express = require("express");
const router = express.Router();
const bookRoutes = require("./book-routes");
const categoryRoutes = require("./category-routes");

chooseMethod = (method, path, func) => { 
    switch (method) {
        case "get":
            router.get(path, func);
            break;
        case "post":
            router.post(path, func);
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

module.exports = router;
const express = require("express");
const productRouter = express.Router();
const {getAllProducts, getProductById, postProduct, updateProduct, deleteProduct, } = require("../controller/productController");
const { isAdmin } = require("../utils");
const expressAsyncHandler = require("express-async-handler");

productRouter.get("/", expressAsyncHandler(getAllProducts));

productRouter.get("/:id", expressAsyncHandler(getProductById));

productRouter.post("/:id", isAdmin, expressAsyncHandler(postProduct));

productRouter.delete("/:id", isAdmin, expressAsyncHandler(deleteProduct));

productRouter.put("/:id", isAdmin, expressAsyncHandler(updateProduct));


module.exports = productRouter
const express = require("express");
const orderRouter = express.Router();
const { isAdmin, isAuth } = require("../utils");
const expressAsyncHandler = require("express-async-handler");
const { getAllOrders, getOrderById, createOrder, deleteOrder, updateOrder, payOrder } = require("../controller/orderController");


orderRouter.get("/", isAuth, isAdmin, expressAsyncHandler(getAllOrders));

orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrderById));

orderRouter.delete("/:id", isAuth, expressAsyncHandler(deleteOrder));

orderRouter.put("/:id/update", isAuth, isAdmin, expressAsyncHandler(updateOrder));

orderRouter.post("/create", isAuth, expressAsyncHandler(createOrder));

orderRouter.post("/:id/pay", isAuth, expressAsyncHandler(payOrder));





module.exports = orderRouter;
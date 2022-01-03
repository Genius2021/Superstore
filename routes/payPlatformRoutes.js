const express = require("express");
const payPlatformRoutes = express.Router();
const { isAuth } = require("../utils");
const expressAsyncHandler = require("express-async-handler");
const { payOrder } = require("../controller/payPlatformController");



// payPlatformRoutes.post("/create", isAuth, expressAsyncHandler(createOrder));


payPlatformRoutes.get("/PayPal/config", (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


payPlatformRoutes.post("/:id/pay", isAuth, expressAsyncHandler(payOrder));





module.exports = payPlatformRoutes;
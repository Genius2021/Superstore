require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const  userRoutes = require("./routes/userRoutes");
const  orderRoutes = require("./routes/orderRoutes");
const  uploadRoutes = require("./routes/uploadRoutes");
const payPlatformRoutes = require("./routes/payPlatformRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payPlatform", payPlatformRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
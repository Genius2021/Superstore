require("dotenv").config();

const productData = require("./data/products.js");
const connectDB = require("./config/db");
const Product = require("./models/productModel.js");

connectDB();

const importData = async () =>{
    try{
        await Product.deleteMany({});
        await Product.insertMany(productData);
        console.log("Data import success");
        process.exit()
    }catch(error){
        console.log(error);
        console.error("Error with data import");
        process.exit(1);
    }
}

importData();
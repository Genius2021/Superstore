const Product = require("../models/productModel");


  //Get all Products
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        res.status(500).send({message: "Boss! There was an error getting the products. \n Please, retry."});
    }
}

   //Get a product
const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.json(product)
    }catch(error){
        res.status(500).send({message: "Boss! An error occured fetching the requested product. Please, retry."});
    }
}

  //Post a new product
const postProduct = async (req, res) => {
    try{
        const creator = req.user._id;
        const product = new Product({
            productCreator: creator,
            productName: req.body.productName,
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock,
            imageUrl: req.body.imageUrl,
            numReviews: req.body.numReviews,
            rating: req.body.rating,
        });
        const savedPost = await product.save();
        res.status(200).json(savedPost)
    }catch(error){
        res.status(500).send({message: "There was an error Posting the product. Retry"});
    }
}

//update product

const updateProduct = async (req, res) => {

    try{
      const product = await Product.findById(req.params.id);
      if(product.productCreator === req.body.username){
         try{
             const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                 $set: req.body,
             }, {new: true});
 
             res.status(200).json(updatedProduct);
         }catch(err){
             res.status(500).json(err)
          }
     }else{
         res.status(401).send("You can update only Products created by you!");
     }
          
    }catch(err){
         res.status(500).send({message: "An Error Occured."})
     }
}

  //Delete a product
  const deleteProduct = async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        if(product.productCreator === req.user.username){
            await Product.findByIdAndDelete(req.params.id);
            res.send({message: "You have successfully deleted the product."})
        }else{
            res.send({message: "You cannot delete a product you did not create."});

        }
       
    }else{
        res.send({message: "Product does not exist!"});

    }  
  }


module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
}
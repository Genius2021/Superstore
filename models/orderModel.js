const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    //An array of objects [{}, {}, {}]
    orderItems: [{
        productName: {type: String, required:true},
        qty: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        price: {type: Number, required:true},
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    }],
    shippingInformation: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {type: String, required: true},
    paymentResult:{id: String, status: String, update_time: String, email_address: String},
    itemsPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    orderCreatorInfo: {
        _id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true,
        },
        email: {type: String, required: true}
    },
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},

}, {timestamps: true});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
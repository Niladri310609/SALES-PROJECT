const mongoose = require('mongoose')
 const moment = require("moment")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    productImage: { type: String, required: true, trim: true },  // s3 link
    pricePerUnit: { type: Number, required: true, trim: true },
    currencyId: { type: String, required: true, enum: ["INR"] },
    quantity: { type: Number, required: true, minLen: 1 },
    totalPrice: { type: Number,required: true},
    revenueDate:{ type:String, required:true, trim: true}

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)


 
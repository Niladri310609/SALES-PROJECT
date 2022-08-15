const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
   
    phone: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },

password: { type: String, required: true, trim:true },

  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
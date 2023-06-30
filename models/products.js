const mongoose = require('mongoose');
const userShema = new mongoose.Schema({
    Product_Name: {
        type:String,
        required:true,
    },
    Price: {
        type:String,
        required:true,
    },
    Description: {
        type:String,
        required:true,
    },      
    Image: {
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Product', userShema);

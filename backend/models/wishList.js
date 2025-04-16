const mongoose = require('mongoose')

const wishList = mongoose.Schema({
   productId : {
        ref : 'product',
        type : String,
   },
   userId : String,
},{
    timestamps : true
})


const wishListModel = mongoose.model("wishList",wishList)

module.exports = wishListModel
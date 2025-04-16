const wishListModel = require("../../models/wishList")

const deleteWish = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const wishListProductId = req.body._id

        const deleteProduct = await wishListModel.deleteOne({ _id : wishListProductId})

        res.json({
            message : "Product Deleted From WishList",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteWish
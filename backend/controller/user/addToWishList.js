const wishListModel = require("../../models/wishList")

const addToWishlist = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await wishListModel.findOne({ productId ,userId : currentUser,})

        console.log("isProductAvailable  ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exits in Wishlist",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            userId : currentUser,
        }

        const newAddToWishList = new wishListModel(payload)
        const saveProduct = await newAddToWishList.save()


        return res.json({
            data : saveProduct,
            message : "Added to  wish list",
            success : true,
            error : false
        })
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = addToWishlist
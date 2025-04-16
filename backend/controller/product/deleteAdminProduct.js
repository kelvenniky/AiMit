const productModel = require("../../models/productModel")

const deleteAdminProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const adminAddProductId = req.body._id

        const deleteProduct = await productModel.deleteOne({ _id : adminAddProductId})

        res.json({
            message : "Product Deleted From Admin Add",
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

module.exports = deleteAdminProduct
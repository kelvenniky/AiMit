const productModel = require("../../models/productModel")

const getSaleTypeWiseProduct = async(req,res)=>{
    try{
        const { saleType } = req?.body || req?.query
        const product = await productModel.find({ saleType })
        console.log('saletype', product)

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getSaleTypeWiseProduct
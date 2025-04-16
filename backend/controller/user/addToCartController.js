const addToCartModel = require("../../models/cartProduct");
const productModel = require("../../models/productModel")


const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Check if the product already exists in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            });
        }

        // Fetch the product price from the product database
        const product = await productModel.findById(productId); // Or however you query for products by ID

        // If the product does not exist, return an error response
        if (!product) {
            return res.json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        // Create a payload for the cart entry, setting bargain to the product's selling price
        const payload = {
            productId: productId,
            quantity: 1,
            bargain: product.sellingPrice, // Assuming the selling price is a property of the product
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = addToCartController;
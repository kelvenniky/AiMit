const addToCartModel = require("../../models/cartProduct");

const bargainPriceController = async (req, res) => {
    try {
        const { productId, bargain } = req.body;

        // Check if the entry exists in the cart
        const cartEntry = await addToCartModel.findOneAndUpdate(
            { productId, },
            { bargain },
            { new: true } // Return the updated document
        );

        if (!cartEntry) {
            return res.status(404).json({
                message: "Cart entry not found",
                success: false,
                error: true
            });
        }

        return res.json({
            data: cartEntry,
            message: "Bargain Successfull",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = bargainPriceController;
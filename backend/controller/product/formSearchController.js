const productModel = require("../../models/productModel");

const formSearchController = async (req, res) => {
    const { productName, bargainMinPrice, bargainMaxPrice } = req.body;

    try {
        // Build the query based on the product name first
        const nameQuery = {
            productName: { $regex: productName, $options: 'i' } // Case-insensitive search
        };

        // Fetch products that match the name query
        const nameMatchedProducts = await productModel.find(nameQuery);

        // If no products match the name query, return empty result
        if (nameMatchedProducts.length === 0) {
            return res.json({
                success: true,
                data: [],
            });
        }

        // If products are found, filter them by price range
        const priceFilteredProducts = nameMatchedProducts.filter(product => {
            return (
                product.price >= bargainMinPrice && 
                product.price <= bargainMaxPrice
            );
        });

        // Return the results
        res.json({
            success: true,
            data: priceFilteredProducts,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

module.exports = formSearchController;
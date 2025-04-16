const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrdersController = async (request, response) => {
    const userId = request.userId;
    const user = await userModel.findById(userId);

    // Check if the user has admin access
    if (user.role !== 'ADMIN') {
        return response.status(403).json({
            message: 'Access denied'
        });
    }

    try {
        // Fetch all orders and populate user details
        const allOrders = await orderModel.find()
            .populate('userId', 'name address') // Assuming userId is the reference in orderModel
            .sort({ createdAt: -1 });

        // Format the data to include user details in the response
        const formattedOrders = allOrders.map(order => ({
            ...order._doc, // Spread the original order document
            userName: order.userId ? order.userId.name : null, // Add user name
            userAddress: order.userId ? order.userId.address : null // Add user address
        }));

        return response.status(200).json({
            data: formattedOrders,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: 'An error occurred while fetching orders',
            error: error.message,
        });
    }
};

module.exports = allOrdersController;
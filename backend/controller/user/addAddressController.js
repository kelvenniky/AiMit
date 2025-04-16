const userModel = require("../../models/userModel");

const addAddressController = async (req, res) => {
    try {
        const currentUserId = req.userId;

        // Make sure to validate currentUserId
        if (!currentUserId) {
            return res.status(400).json({
                message: "User ID is missing.",
                error: true,
                success: false
            });
        }

        const updateData = req.body; // Ensure this contains only valid fields

        // Update user document and return the updated document
        const updatedUser = await userModel.findByIdAndUpdate(currentUserId, updateData, { new: true });

        // Check if the update was successful
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found.",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Address updated successfully.",
            data: updatedUser,
            error: false,
            success: true
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred while updating the address.",
            error: true,
            success: false
        });
    }
};

module.exports = addAddressController;
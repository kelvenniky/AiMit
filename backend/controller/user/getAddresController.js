const userModel = require("../../models/userModel.js");

async function getAddressController(req, res) {
    try {
        console.log("user.id", req.userId);

        const address = await userModel.findById(req.userId);

        if (!address) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            data: address,
            error: false,
            success: true,
            message: "Address data"
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getAddressController;
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        // Destructure required fields from request body
        const { email, password, name,firstname,  lastname, address,info, city, region } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        console.log("Existing User:", existingUser);

        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Validate required fields
        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password.");
        }

        // Prepare the payload with additional fields
        const payload = {
            email,
            password: hashPassword,
            name,
            firstname,
            lastname,
            number1,
            number2,
            address,
            info,
            city,
            region,
            role: "GENERAL" // Default role for new users
        };

        // Create a new user instance and save it to the database
        const newUser = new userModel(payload);
        const savedUser = await newUser.save();

        // Respond with success
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        // Handle errors and provide feedback
        res.status(400).json({
            message: err.message || "An error occurred during user registration.",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

// registerController
async function registerController(req, res) {
    const { name, email, password } = req.body;
    try {
        const isUserExiest = await userModel.findOne({ email });
        if (isUserExiest) {
            return res.status(409).json({ sucess: false, message: "User Already exist" })
        }
        // bcrypt for  Hash password
        const hash = await bcrypt.hash(password, 10);

        //   Hash password
        const newUser = await userModel.create({ name, email, password: hash })
        return res.status(201).json({ success: true, message: "user register Successfully" })
    } catch (error) {
        console.error("Register error", error)
        return res.status(500).
            json({
                success: false,
                message: "Register error", error
            })
    }
}

// loginController

async function loginController(req, res) {
    const { email, password } = req.body;
    try {
       // find the user in database
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ succcess: false, message: "User are not register", user })
    }
    // compare the hash password 
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ success: false, message: "Invalid password" })
    }
    // generate jwt Token
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
});

// cokie generate
res .cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

return res.status(200).json({ success: true, message: "Login Successfully", token });

     
    } catch (error) {
        console.error("Login error", error)
        return res.status(500).
            json({
                success: false,
                message: "Login error", 
            })
    }
}

module.exports = { registerController, loginController }


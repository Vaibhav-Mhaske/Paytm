const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signin = zod.object({
    username: string(),
    password: string()
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeparse(body);
    if (!success) {
        return res.status(400).json({
            message: "invalid input"
        })
    }

    const existingUser = await User.fingOne({ username: body.username }); // this will find and return the user with the given username
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const dbUser = await User.create(body) // this will create a new user with the given details in the body of the request
    const userId = dbUser._id

    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })
})

module.exports = router;
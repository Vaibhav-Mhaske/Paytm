const express = require("express"); // Importing the Express framework
const zod = require("zod"); // Importing the Zod library for data validation
const jwt = require("jsonwebtoken"); // Importing the JSON Web Token library
const { User, Account } = require("../db"); // Importing the User model from the "../db" file
const { JWT_SECRET } = require("../config"); // Importing the JWT_SECRET from the "../config" file
const { authMiddleware } = require("../middleware")

const router = express.Router(); // Creating an instance of the Express Router

// Defining a schema for user signup data validation using Zod
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

// Handling the POST request for user signup
router.post("/signup", async (req, res) => {
    const body = req.body; // Extracting the request body

    // Validating the request body against the signup schema
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    // Checking if a user with the same username already exists in the database
    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    // Creating a new user in the database with the provided details
    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // Generating a JSON Web Token (JWT) with the user ID
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // Sending the response with a success message and the generated token
    res.json({
        message: "User created successfully",
        token: token
    });
});

// Defining a schema for user signin data validation using Zod
const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging"
    })
})

const updateBodySchema = zod.object({
    username: zod.string().optional(),
    firtName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBodySchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Invalid Inputs / Error while updating information"
        })
    }

    await User.updateOne({
        _id: req_userId
    }, req.body)

    res.json({
        message: " User Information Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.findOne({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router; // Exporting the router for use in other files
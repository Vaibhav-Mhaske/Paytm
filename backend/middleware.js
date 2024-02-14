const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken");

// This is a middleware function in Express.js for authentication
const authMiddleware = (req, res, next) => {
    // It first retrieves the 'authorization' header from the request
    const authHeader = req.headers.authorization;

    // It checks if the 'authorization' header is present and starts with 'Bearer '
    // If not, it sends a response with a 403 status code (Forbidden) and an empty JSON object
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({})
    }

    // If the 'authorization' header is present and correctly formatted, it extracts the token part
    // The token is the second part of the 'authorization' header (after 'Bearer ')
    const token = authHeader.split(' ')[1];

    try {
        // It tries to verify the token using the jwt.verify function
        // jwt.verify decodes the token and checks if it was signed with the same secret key (JWT_SECRET)
        // If the token is valid, it returns the payload that was encoded into the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // If the token is valid, it adds the 'userId' from the token payload to the request object
        // This allows subsequent middleware functions and route handlers to know which user made the request
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({})
        }
        // It then calls next(), which passes control to the next middleware function in the stack
        next();
    } catch {
        // If the token is not valid (it was not signed with the correct secret, it is expired, etc.),
        // jwt.verify throws an error, and the function catches this error and returns a 403 status code
        return res.status(403).json({})
    }
}

module.exports(authMiddleware);
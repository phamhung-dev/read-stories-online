const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const config = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({message: "ERROR", data: { content: "A token is required for authentication" }});
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        var user = await User.findOne({ email: req.user.email });
        if (!user || user.token !== token) {
            return res.status(401).json({message: "ERROR", data: { content: "Invalid token" }});
        }
    } catch (err) {
        return res.status(401).json({message: "ERROR", data: { content: "Invalid token" }});
    }
    return next();
};

module.exports = verifyToken;
const { func } = require("joi");
const jwt = require("jsonwebtoken");
jwtSecret = "djakjdajkdkakjkadkjandnjaknjdakna";

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
    } catch (error) {
        return res.status(400).send("Invalid Token");
    }

    next();
};

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

jwtSecret = "djakjdajkdkakjkadkjandnjaknjdakna";

router.post("/register", async (req, res) => {
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user.id });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Email does not exist");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send("Email or password is wrong");

    const token = jwt.sign({ id: user.id }, jwtSecret);
    res.header("auth-token", token).send(token);
});

module.exports = router;

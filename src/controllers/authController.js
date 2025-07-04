const { registerUser, loginUser } = require("../services/authServices");

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        await registerUser(email, password, name);

        return res
            .status(201)
            .json({ message: "User registered Successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login };

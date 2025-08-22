const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (User) => {
  return {
    // Register User
    register: async (req, res) => {
      try {
        const { username, phonenumber, email, password } = req.body;

        if (!username || !phonenumber || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }

        // check existing email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({ message: "Email already registered" });
        }

        // check existing phone
        const existingPhone = await User.findOne({ where: { phonenumber } });
        if (existingPhone) {
          return res.status(400).json({ message: "Phone number already registered" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          username,
          phonenumber,
          email,
          password: hashedPassword,
        });

        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: user.userId,
            username: user.username,
            phonenumber: user.phonenumber,
            email: user.email,
          },
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },

    // Login User
    login: async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

        // generate token
        const token = jwt.sign(
          { id: user.userId, email: user.email, phonenumber: user.phonenumber },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.userId,
            username: user.username,
            phonenumber: user.phonenumber,
            email: user.email,
          },
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
};

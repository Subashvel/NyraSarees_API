const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Compare with .env values
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate token
      const token = jwt.sign(
        { role: "admin", username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

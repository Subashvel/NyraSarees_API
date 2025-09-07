const express = require("express");
const userControllerFactory = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (User) => {
  const router = express.Router();
  const userController = userControllerFactory(User);

  router.post("/register", userController.register);
  router.post("/login", userController.login);

    // 🔹 Forgot Password
  router.post("/forgot-password", userController.forgotPassword);

  router.post("/verify-otp", userController.verifyOtp);

  // 🔹 Reset Password
  router.post("/reset-password", userController.resetPassword);

  // 🔹 Get all users (without passwords)
  router.get("/", async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] }
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { userId: id },
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 Update username, phonenumber, email only
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { username, phonenumber, email } = req.body;

      const user = await User.findOne({ where: { userId: id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // update only allowed fields
      user.username = username ?? user.username;
      user.phonenumber = phonenumber ?? user.phonenumber;
      user.email = email ?? user.email;

      await user.save();

      // send back updated user (excluding password)
      const updatedUser = await User.findOne({
        where: { userId: id },
        attributes: { exclude: ["password"] }
      });

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  return router;
};

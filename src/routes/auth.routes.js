const express = require("express");
const userControllerFactory = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (User) => {
  const router = express.Router();
  const userController = userControllerFactory(User);

  router.post("/register", userController.register);
  router.post("/login", userController.login);

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

  router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        userId: user.userId,
        username: user.username,
        phonenumber: user.phonenumber,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  



  return router;
};

const express = require("express");
const userControllerFactory = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (User) => {
  const router = express.Router();
  const userController = userControllerFactory(User);

  router.post("/register", userController.register);
  router.post("/login", userController.login);

  // Protected route
  router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

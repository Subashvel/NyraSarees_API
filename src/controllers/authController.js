const crypto = require("crypto");
const nodemailer = require("nodemailer");
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

    forgotPassword: async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save hashed OTP and expiry
    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `<p>Hello ${user.username},</p>
             <p>Your OTP for password reset is: <strong>${otp}</strong></p>
             <p>It will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
},


   verifyOtp: async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    const isValid = await bcrypt.compare(otp, user.otp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
},

    resetPassword: async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: You can also check OTP verification flag if stored

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

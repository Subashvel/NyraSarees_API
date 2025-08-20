// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('../models');

// // REGISTER a new user
// exports.create = async (req, res, User) => {
//   try {
//     const { fullname, email, password } = req.body;

//     // Check if email exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       fullname,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET all users
// exports.getAll = async (req, res, User) => {
//   try {
//     const users = await User.findAll({ attributes: { exclude: ['password'] } });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET user by ID
// exports.getById = async (req, res, User) => {
//   try {
//     const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE user by ID
// exports.delete = async (req, res, User) => {
//   try {
//     const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
//     if (rowsDeleted === 0) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // LOGIN user
// exports.login = async (req, res, User) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
//     );

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: { id: user.id, fullname: user.fullname, email: user.email }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Middleware to protect routes
// exports.protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Not authorized, token missing' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

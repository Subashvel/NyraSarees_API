// const express = require('express');
// const registerController = require('../controllers/register.controller');

// module.exports = (User) => {
//   const router = express.Router();

//   // Register
//   router.post('/', (req, res) => registerController.create(req, res, User));

//   // Login
//   router.post('/login', (req, res) => registerController.login(req, res, User));

//   // Protected routes
//   router.get('/', registerController.protect, (req, res) =>
//     registerController.getAll(req, res, User)
//   );

//   router.get('/:id', registerController.protect, (req, res) =>
//     registerController.getById(req, res, User)
//   );

//   router.delete('/:id', registerController.protect, (req, res) =>
//     registerController.delete(req, res, User)
//   );

//   return router;
// };

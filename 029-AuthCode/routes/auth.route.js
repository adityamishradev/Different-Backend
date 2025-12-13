const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Register Route
router.post('/register', registerController);
// Login Route
router.post('/login', loginController);
module.exports = router;
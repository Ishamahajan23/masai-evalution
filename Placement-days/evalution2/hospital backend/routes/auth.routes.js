const express = require('express');
const { register, login, getProfile } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');

const authrouter = express.Router();

authrouter.post('/register', register);
authrouter.post('/login', login);

authrouter.get('/profile', authenticate, getProfile);

module.exports = authrouter;
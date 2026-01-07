const express = require('express');
// const verifyApiKey = require('../middlewares/task.middleware');
const { GenerateApiKey } = require('../controllers/task.controller');
const authrouter = express.Router();


authrouter.post("/generate-key", GenerateApiKey );

module.exports = authrouter;
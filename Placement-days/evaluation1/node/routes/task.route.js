const express = require('express');
const verifyApiKey = require('../middlewares/task.middleware');
const { createTask, updateTask, deleteTask, getById, getTasks} = require('../controllers/task.controller');
const taskrouter = express.Router();
taskrouter.get("/", getTasks);
taskrouter.get("/:_id", getById);
taskrouter.post("/", createTask);
taskrouter.put("/:_id", updateTask);
taskrouter.delete("/:_id", deleteTask);




module.exports = taskrouter;
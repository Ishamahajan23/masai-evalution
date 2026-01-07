const express = require("express");
const connectDB = require("./db")
const authrouter = require("./routes/auth.route")
const taskrouter = require("./routes/task.route")
const verifyApiKey = require('./middlewares/task.middleware');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
connectDB();

app.use("/api/auth", authrouter);
app.use("/api/tasks",verifyApiKey, taskrouter);





app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
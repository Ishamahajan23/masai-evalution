const express = require('express');
const connectDB = require('./Model/server');
const listRouter = require('./Routes/list.routes');
const cors = require('cors');
require('dotenv').config();


connectDB();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/lists', listRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
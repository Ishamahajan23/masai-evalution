const express = require('express');
const connectDB = require('./Model/server');
const listRouter = require('./Routes/list.routes');
const cors = require('cors');
require('dotenv').config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 8000;

    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    }));

    app.use(express.json());
    app.use('/api/lists', listRouter);

    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  }
};

startServer();
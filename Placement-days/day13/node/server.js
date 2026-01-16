import express from 'express';
import verificationMiddleware from './middleware/verification.middleware.js';
import errorHandler from './middleware/errorhandler.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.post('/register', verificationMiddleware, (req, res) => {
  res.status(200).json({ message: 'User registered successfully' });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

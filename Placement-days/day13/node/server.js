import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global logger (VERY IMPORTANT)
app.use((req, res, next) => {
  console.log('HIT ->', req.method, req.url);
  next();
});

const verificationMiddleware = (req, res, next) => {
  console.log('MIDDLEWARE BODY:', req.body);

  const { email, password, age } = req.body;
  const errors = [];

  if (!email) errors.push('email missing');
  if (!password) errors.push('password missing');
  if (!age) errors.push('age missing');

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};

app.post('/register', verificationMiddleware, (req, res) => {
  res.json({ message: 'SUCCESS' });
});

app.listen(PORT, () => {
  console.log('Server running on 5000');
});

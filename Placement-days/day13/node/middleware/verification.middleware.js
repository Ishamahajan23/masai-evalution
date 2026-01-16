const verificationMiddleware = (req, res, next) => {
  const { email, password, age } = req.body;
  const errors = [];
  console.log(req.body);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!password || password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters'
    });
  }

  if (!age || typeof age !== 'number' || age < 18) {
    errors.push({
      field: 'age',
      message: 'Age must be a number and at least 18'
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export default verificationMiddleware;

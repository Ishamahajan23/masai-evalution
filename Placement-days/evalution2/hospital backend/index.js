const express = require('express');
const { connectDB } = require('./db.js');
const authrouter = require('./routes/auth.routes');
const router = require('./routes/patient.routes');
const doctorrouter = require('./routes/doctor.routes');
const cors = require('cors');

require('dotenv').config();

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/auth', authrouter);
app.use('/patient', router);
app.use('/doctor', doctorrouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
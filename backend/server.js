const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); 

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(morgan('dev')); 

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes); 

app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
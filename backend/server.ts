// backend/server.ts

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import workoutRoutes from './routes/workout';
import calorieRoutes from './routes/calorie';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/your-db-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/calories', calorieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

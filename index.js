import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './db.js';
import moodsRouter from './routes/moods.js';
import usersRouter from './routes/users.js';


const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Base route
app.get('/', (req, res) => {
    res.send('Mood Tracker Backend is running!');
});

// API routes
app.use('/api/moods', moodsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} ⚡`);
});

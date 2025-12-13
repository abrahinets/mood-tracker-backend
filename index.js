import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './connectDb.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import moodsRouter from './routes/moods.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

await connectDB();

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/moods', moodsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

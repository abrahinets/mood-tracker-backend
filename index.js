import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { connectDB } from './connectDb.js';
import { swaggerSpec } from './src/swagger/swagger.js';
import usersRouter from './routes/users.js';
import moodsRouter from './routes/moods.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

await connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/moods', moodsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

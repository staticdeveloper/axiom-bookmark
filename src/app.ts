import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(errorHandler);

export default app;
import express,{Express, Request, Response, urlencoded, json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import { openConnection } from './utils/connection';
import v1 from './routes';
import reportError from './middlewares/error';
import { info } from './utils/logger';
import protectRoutes from './middlewares/jwt-verification';

//Loading all env variables
import './utils/config';

//Creating express app
const app:Express = express();
const port = process.env.PORT || 4200;

//Loading all default middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());

//Protecting routes via express-jwt middleware
app.use(protectRoutes());
//Loading V1 routes
app.use('/v1',v1);
//Middleware to report all errors
app.use(reportError);

//Starting server & dB connections
app.listen(port, () => {
    info('listening on port: ' + port);
    openConnection();
});
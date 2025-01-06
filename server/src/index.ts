import express,{Express, Request, Response, urlencoded, json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import { openConnection } from './utils/connection';
import v1 from './routes';
import reportError from './middlewares/error';

//Loading all env variables
dotenv.config();

//Creating express app
const app:Express = express();
const port = process.env.PORT || 4200;

//Loading all default middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());

//Loading V1 routes
app.use('/v1',v1);
app.use(reportError);

//Starting server & dB connections
app.listen(port, () => {
    console.log('listening on port: ' + port);
    openConnection();
});
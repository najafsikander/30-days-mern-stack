import express,{Express, Request, Response, urlencoded, json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import { openConnection } from './utils/connection';
import v1 from './routes';

// import { openConnection } from './utils/connection';

dotenv.config();

const app:Express = express();
const port = process.env.PORT || 4200;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());
app.use('/v1',v1);

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
});

app.get('/test', (req:Request, res:Response) => {
    res.json({
        message: 'Hello World'
    });
});

app.listen(port, () => {
    console.log('listening on port: ' + port);
    openConnection();
});
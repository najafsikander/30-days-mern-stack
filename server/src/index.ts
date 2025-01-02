import express,{Express, Request, Response, urlencoded, json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";


dotenv.config();

const app:Express = express();
const port = process.env.PORT || 4200;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());

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
});
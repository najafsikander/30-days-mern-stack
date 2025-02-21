import express,{Express, Request, Response, urlencoded, json} from 'express';
import { createServer } from 'http';
import { initializeSocket } from './utils/socket';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import fileUpload from 'express-fileupload';
import path from 'path';
import { __dirname } from './utils/directory';
import { openConnection } from './utils/connection';
import v1 from './routes';
import reportError from './middlewares/error';
import { info, log } from './utils/logger';
import protectRoutes from './middlewares/jwt-verification';

//Loading all env variables
import './utils/config';
import { verifySocketAuthentication } from './middlewares/socket-auth';
import { privateChatHandler } from './socketHandlers/privateChatHandler';

//Creating express app
const app:Express = express();
const port = process.env.PORT || 4200;
const httpServer = createServer(app);
const io = initializeSocket(httpServer);
io.use(verifySocketAuthentication);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname,'..','..', 'public')));
app.use('/uploads', express.static('public/uploads'));

//Loading all default middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());
app.use(fileUpload());

//Protecting routes via express-jwt middleware
app.use(protectRoutes());
//Loading V1 routes
app.use('/v1',v1);
//Middleware to report all errors
app.use(reportError);

//Initializing socket connection
io.on('connection', (socket) => {
    log(`New client connected: `+ socket.id);
    log('User connected: '+ socket.data.user.userId);
    
    privateChatHandler(io,socket);

    socket.on('disconnect', () => {
        log('User disconnected: '+ socket.data.user.userId)
    })
})
//Starting server & dB connections
httpServer.listen(port, () => {
    info('listening on port: ' + port);
    openConnection();
});
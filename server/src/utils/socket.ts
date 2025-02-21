import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { log } from "./logger";

let socketInstance:Server | null = null;

const initializeSocket = (server:HttpServer):Server => {
    if(!socketInstance) {
        socketInstance = new Server(server,{
            cors:{
                origin: '*',
            }
        });
        log('Socket initialized');
    }

    return socketInstance;
}

const getSocketInstance = ():Server => {
    if(!socketInstance) throw 'Socket instance was not initialized';

    return socketInstance;
}

export {
    initializeSocket,
    getSocketInstance
}
import { Socket } from "socket.io";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from "../utils/config.js";
import { log } from "../utils/logger.js";


export const verifySocketAuthentication = (socket: Socket, next: (err?: any) => void) => {
    const token = socket.handshake.auth.token;
    if(!token) return next (new Error ('Authentication Failed: Token not provided'));

    const decoded:any = jwt.verify (token,SECRET!);
    if(!decoded) return next (new Error ('Authentication Failed: Invalid token'));
    socket.data.user = decoded;

    next();
}
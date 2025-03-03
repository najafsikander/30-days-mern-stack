import {expressjwt} from 'express-jwt';
import { SECRET } from '../utils/config';
import jwt from 'jsonwebtoken';
import { log } from '../utils/logger';
import { AuthenticatedRequest } from '../utils/intefaces';


const protectRoutes = () => {
    console.info('Protect routes: ', SECRET);
    return expressjwt({secret:SECRET!, algorithms: ['HS256'], getToken:(req:AuthenticatedRequest):string => {
        const token = req.headers.authorization?.toString().split(' ')[1];
        if(!token) throw 'Authentication Failed: Token not provided';
        const decodedToken:any = jwt.verify(token, SECRET!);
        req.role = decodedToken.role;
        log('DECODED TOKEN: '+ JSON.stringify(decodedToken)+ req.role);
        return token;
    }}).unless({
        path: [
            '/v1/auth/login',
            '/v1/auth/signup',
            '/v1/auth/sendResetPasswordMail',
            '/v1/auth/newUserPassword'
        ]
    });
}

export default protectRoutes;
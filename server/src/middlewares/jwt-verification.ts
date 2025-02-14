import {expressjwt} from 'express-jwt';
import { SECRET } from '../utils/config';

const protectRoutes = () => {
    console.info('Protect routes: ', SECRET);
    return expressjwt({secret:SECRET!, algorithms: ['HS256']}).unless({
        path: [
            '/v1/auth/login',
            '/v1/auth/signup',
            '/v1/auth/sendResetPasswordMail',
            '/v1/auth/newUserPassword'
        ]
    });
}

export default protectRoutes;
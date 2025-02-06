import {expressjwt} from 'express-jwt';

const protectRoutes = () => {
    console.info('Protect routes: ', process.env.SECRET);
    return expressjwt({secret:process.env.SECRET!, algorithms: ['HS256']}).unless({
        path: [
            '/v1/auth/login',
            '/v1/auth/signup'
        ]
    });
}

export default protectRoutes;
import {Router, Request, Response, NextFunction} from 'express';
import { log, warn } from "../utils/logger";
import AuthController from '../controller/authC';

const router = Router();
const authController  = new AuthController();

router.post('/login', async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {email, password} = req.body;
        const user = await authController.login(email, password);
        res.status(200).json({message: 'Login successful', user});
    } catch (err) {
        warn('Error caught in login route: '+err);
        next(err);
    }
});

router.post('/signup', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {user} = req.body;
        const newUser = await authController.signup(user);
        res.status(201).json({message: 'Signup successful', newUser});
    } catch(err) {
        warn('Error caught in signup route: '+err);
        next(err);
    }
});

export default router;
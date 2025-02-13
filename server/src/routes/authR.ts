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

router.patch('/changePassword/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const {oldPassword, password} = req.body;
        const result = await authController.changePassword(id,oldPassword,password);
        res.status(201).json({message: 'Changed password successfully',user:result});
    } catch (err) {
        warn('Error caught in change password route: '+err);
        next(err);
    }
});

router.post('/sendResetPasswordMail',async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email} = req.body;
        const message = await authController.sendResetPasswordMail(email);
        res.status(200).json({message});
    } catch (err) {
        warn('Error caught in sendResetPasswordMail route: '+err);
        next(err);
    }
});

export default router;
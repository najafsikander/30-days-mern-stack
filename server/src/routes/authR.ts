import {Router, Request, Response, NextFunction} from 'express';
import { log, warn } from "../utils/logger.js";
import AuthController from '../controller/authC.js';
import { changePassSchema, loginSchema, registerSchema, resetPassSchema } from '../validators/auth.validator.js';
import Validator from '../middlewares/joiValidator.js';
const router = Router();
const authController  = new AuthController();

router.post('/login',Validator(loginSchema), async (req:Request, res: Response, next:NextFunction) => {
    try {
        const {email, password} = req.body;
        const user = await authController.login(email, password);
        res.status(200).json({message: 'Login successful', user});
    } catch (err) {
        warn('Error caught in login route: '+err);
        next(err);
    }
});

router.post('/signup',Validator(registerSchema), async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {user} = req.body;
        const newUser = await authController.signup(user);
        res.status(201).json({message: 'Signup successful', newUser});
    } catch(err) {
        warn('Error caught in signup route: '+err);
        next(err);
    }
});

router.patch('/changePassword/:id',Validator(changePassSchema), async (req:Request, res:Response, next:NextFunction) => {
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

router.post('/sendResetPasswordMail',Validator(resetPassSchema),async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email} = req.body;
        const message = await authController.sendResetPasswordMail(email);
        res.status(200).json({message});
    } catch (err) {
        warn('Error caught in sendResetPasswordMail route: '+err);
        next(err);
    }
});

router.post('/newUserPassword',async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {token,password} = req.body;
        const message = await authController.newUserPassword(token,password);
        res.status(200).json({message});
    } catch (err) {
        warn('Error caught in newUserPassword route: '+err);
        next(err);
    }
})

export default router;
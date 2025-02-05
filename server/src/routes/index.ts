import { Router } from "express";
import userRouter from './userR';
import authRouter from './authR';

const router = Router();

//Getting child root routes
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
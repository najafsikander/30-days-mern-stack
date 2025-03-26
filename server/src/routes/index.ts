import { Router } from "express";
import userRouter from './userR.js';
import authRouter from './authR.js';

const router = Router();

//Getting child root routes
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
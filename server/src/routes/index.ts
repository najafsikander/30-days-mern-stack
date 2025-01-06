import { Router } from "express";
import userRouter from '../routes/user';

const router = Router();

//Getting child root routes
router.use('/user', userRouter);

export default router;
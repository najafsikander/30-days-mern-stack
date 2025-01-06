import { Router } from "express";
import userRouter from '../routes/user';

const router = Router();

//Getting child root routes
router.use('/users', userRouter);

export default router;
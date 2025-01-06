import { Router, Request,Response } from "express";
import UserController from "../controller/user";
const router = Router();

//Route to fetch all users from DB
router.get('/',async (req:Request, res:Response, next) => {
    try {
        const data = await new UserController().getAllUsers();
        console.log('Data: ',data);
        res.status(200).json(data);
    } catch(err) {
        console.warn('Error caught in root user route: ', err);
        next(err);
    }
});

export default router;
import { Router, Request,Response } from "express";
import UserController from "../controller/user";
import { log, warn } from "../utils/logger";

const router = Router();

//Route to fetch all users from DB
router.get('/',async (req:Request, res:Response, next) => {
    try {
        const data = await new UserController().getAllUsers();
        log('Data: '+data);
        res.status(200).json(data);
    } catch(err) {
        warn('Error caught in root user route: ' + err);
        next(err);
    }
});

export default router;
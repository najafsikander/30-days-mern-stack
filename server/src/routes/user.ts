import { Router, Request,Response } from "express";
import UserController from "../controller/user";
const router = Router();

router.get('/',async (req:Request, res:Response) => {
    try {
        const data = await new UserController().getAllUsers();
        console.log('Data: ',data);
        res.status(200).json(data);
    } catch(err:any) {
        console.warn('Error caught in root user route: ', err);
        res.status(500).json({message: 'Internal server error: ' + err.message});
    }
});

export default router;
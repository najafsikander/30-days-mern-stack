import { Router, Request,Response, NextFunction } from "express";
import UserController from "../controller/user";
import { log, warn } from "../utils/logger";

const router = Router();
const userController = new UserController();

//Route to fetch all users from DB
router.get('/',async (req:Request, res:Response, next:NextFunction) => {
    try {
        const data = await userController.getAllUsers();
        log('Data: '+data);
        res.status(200).json(data);
    } catch(err) {
        warn('Error caught in root user route: ' + err);
        next(err);
    }
});

router.get('/:id',async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const user = await userController.getSingleUser(id);
        log('User: '+user);
        res.status(200).json(user);
    } catch (err) {
        warn('Error caught in fetch single user route: ' + err);
        next(err);
    }
});

router.post('/user', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {user} = req.body;
        const newUser = await userController.createUser(user);
        log('User created' + newUser);
        res.status(201).json(newUser);
    } catch (err) {
        warn('Error caught in create user route: ' + err);
        next(err);
    }
});

router.put('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const {user} = req.body;
        const updatedUser = await userController.updateUser(id, user);
        log('User updated: '+updatedUser);
        res.status(200).json(updatedUser);
    } catch (err) {
        warn('Error caught in update user route: ' + err);
        next(err);
    }
});

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const deletedUser = await userController.deleteUser(id);
        log('User deleted: '+deletedUser);
        res.status(200).json(deletedUser);
    } catch (err) {
        warn('Error caught in delete user route: ' + err);
        next(err);
    }
});
export default router;
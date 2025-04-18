import { Router, Request,Response, NextFunction } from "express";
import UserController from "../controller/userC.js";
import { log, warn } from "../utils/logger.js";
import Validator from "../middlewares/joiValidator.js";
import { saveEditUserSchema } from "../validators/user.validator.js";
import { checkRole } from "../middlewares/role-verification.js";

const router = Router();
const userController = new UserController();

//Route to fetch all users from DB
router.get('/',checkRole(['admin','viewer'],'view'),async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {skip,limit,sortBy,email} = req.query;
        const data = await userController.getAllUsers(Number(skip), Number(limit), sortBy?.toString(), email!.toString());
        log('Data: '+data);
        res.status(200).json(data);
    } catch(err) {
        warn('Error caught in root user route: ' + err);
        next(err);
    }
});

router.get('/user/:id',async (req:Request, res:Response, next:NextFunction) => {
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

router.post('/user', Validator(saveEditUserSchema), async (req:Request, res:Response, next:NextFunction) => {
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

router.put('/user/:id', Validator(saveEditUserSchema), async (req:Request, res:Response, next:NextFunction) => {
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

router.delete('/user/:id', async (req:Request, res:Response, next:NextFunction) => {
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

router.patch('/updateUserProfilePicture/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const updatedResponse = await userController.updateUserProfilePicture(id,req.files);
        log('User updated: '+updatedResponse);
        res.status(200).json(updatedResponse);
    } catch (err) {
        warn('Error caught in update profile picture route: ' + err);
        next(err);
    }
});

router.post('/giveUserRating', async (req:Request, res:Response, next:NextFunction) => {
    try {
        log("Ratings body: "+ JSON.stringify(req.body));
        const {rating, remark,userId} = req.body;
        const newRating = await userController.giveUserRating(rating, remark, userId);
        log('User rating given: '+newRating);
        res.status(201).json(newRating);
    } catch (err) {
        warn('Error caught in give user rating route: ' + err);
        next(err);
    }
});

router.get('/getAllRatings', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const data = await userController.getAllRatings();
        log('Ratings: '+data);
        res.status(200).json(data);
    } catch (err) {
        warn('Error caught in get all ratings route: ' + err);
        next(err);
    }
});

router.delete('/deleteUserRating/:id', async (req:Request, res: Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        const response = await userController.deleteUserRating(id);
        log('User rating deleted: '+response);
        res.status(200).json(response);
    } catch (error) {
        warn('Error caught in delete user rating route: ' + error);
        next(error);
    }
});
export default router;
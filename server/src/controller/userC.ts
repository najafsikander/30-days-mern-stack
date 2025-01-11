import User, { IUser } from "../models/userM";
import { info,error } from "../utils/logger";
class UserController {

    async getAllUsers(skip:number=0, limit:number=0, sortBy:string='-createdAt'){
        try {
            info(`Skip: ${skip} & limit ${limit}`);
            const users = await User.find().limit(limit).skip((skip-1)*limit).sort(sortBy);
            info('Users: ' + users);
            return users;
        } catch (err) {
            error('Error caught in getAllUsers controller: '+ err);
            throw err;
        }
    }

    async getSingleUser(id: string) {
        try {
            const user = await User.findById(id);
            info('Single user found: '+ user);
            if(!user) throw 'No user found for provided id';
            return user;
        } catch(err) {
            error('Error caught in getSingleUser controller: '+ err);
            throw err;
        }
    }

    async createUser(user: any) {
        try {
            const newUser = new User(user);
            const savedUser = await newUser.save();
            info('User created: '+ savedUser);
            return savedUser;
        } catch (err:any) {
            error('Error caught in createUser controller: '+ err);
            if(err.code === 11000) throw 'Email already exists';
            throw err;
        }
    }

    async updateUser(id: string, user: IUser) {
        try {
            const existingUser = await User.findById(id);
            info('Existing user: ' + existingUser);
            if(!existingUser) throw 'No user found for provided id';
            existingUser.firstName = user.firstName;
            existingUser.lastName = user.lastName;
            existingUser.email = user.email;
            const updatedUser = await existingUser.save();
            info('User updated: '+ updatedUser);
            return updatedUser;
        } catch (err) {
            error('Error caught in updateUser controller: '+ err);
            throw err;
        }
    }

    async deleteUser(id:string) {
        try {
            const existingUser = await this.getSingleUser(id);
            const deletedUser = await existingUser.deleteOne();
            info('User deleted: '+ deletedUser);
            return deletedUser;
        } catch(err) {
            error('Error caught in deleteUser controller: '+ err);
            throw err;
        }
    }
}

export default UserController;
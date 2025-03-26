import { FileArray } from "express-fileupload";
import User, { IUser } from "../models/userM.js";
import { info, error } from "../utils/logger.js";
import { __dirname, getUploadPath } from "../utils/directory.js";
import path from "path";
import { redisClient } from "../utils/redis.js";
class UserController {



    async getAllUsers(skip: number = 0, limit: number = 0, sortBy: string = '-createdAt', email?: string) {
        try {
            info('GOT REDIS client: ' + redisClient)
            const cacheKey = 'query:users';

            if (email) {
                const cachedResponse = await redisClient.get(cacheKey);
                info('Cached response: ' + JSON.parse(cachedResponse));
                if (cachedResponse) {
                    const { usersC, totalC } = JSON.parse(cachedResponse);
                    info('Total users: ' + totalC+' users: ' + usersC);
                    if (cachedResponse) return { users: usersC, total: totalC };
                }
            }


            info(`Skip: ${skip} & limit ${limit} & sortBy ${sortBy} & email ${email}`);
            let query: { email?: string } = {};
            if (email) query.email = email;
            info('query: ' + JSON.stringify(query));
            const users = await User.find(query).limit(limit).skip((skip - 1) * limit).sort(sortBy);
            const usersCount = await User.where(query).countDocuments();
            info('Users: ' + users);
            info('Users count: ' + usersCount);

            if (email) redisClient.set(cacheKey, JSON.stringify({ usersC: users, totalC: usersCount }), 3600);

            return { users, total: usersCount };
        } catch (err) {
            error('Error caught in getAllUsers controller: ' + err);
            throw err;
        }
    }

    async getSingleUser(id: string) {
        try {
            const user = await User.findById(id);
            info('Single user found: ' + user);
            if (!user) throw 'No user found for provided id';
            return user;
        } catch (err) {
            error('Error caught in getSingleUser controller: ' + err);
            throw err;
        }
    }

    async createUser(user: any) {
        try {
            const newUser = new User(user);
            const savedUser = await newUser.save();
            info('User created: ' + savedUser);
            return savedUser;
        } catch (err: any) {
            error('Error caught in createUser controller: ' + err);
            if (err.code === 11000) throw 'Email already exists';
            throw err;
        }
    }

    async updateUser(id: string, user: IUser) {
        try {
            const existingUser = await User.findById(id);
            info('Existing user: ' + existingUser);
            if (!existingUser) throw 'No user found for provided id';
            existingUser.firstName = user.firstName;
            existingUser.lastName = user.lastName;
            existingUser.email = user.email;
            const updatedUser = await existingUser.save();
            info('User updated: ' + updatedUser);
            return updatedUser;
        } catch (err) {
            error('Error caught in updateUser controller: ' + err);
            throw err;
        }
    }

    async deleteUser(id: string) {
        try {
            const existingUser = await this.getSingleUser(id);
            const deletedUser = await existingUser.deleteOne();
            info('User deleted: ' + deletedUser);
            return deletedUser;
        } catch (err) {
            error('Error caught in deleteUser controller: ' + err);
            throw err;
        }
    }

    async updateUserProfilePicture(id: string, files: any) {
        try {
            // const data = JSON.parse(body);
            if (!files || !files.profilePic) throw 'No profile picture attached';
            const user = await User.findById(id);
            if (!user) throw 'User not found!';
            const profilePic = files.profilePic;
            const uploadPath = getUploadPath(profilePic.name);
            const result = await profilePic.mv(uploadPath);
            info('Result: ' + result);
            const profilePicPath = `/uploads/${profilePic.name}`;
            user.profilePic = profilePicPath;
            const newUserDetails = await user.save();
            return newUserDetails;
        } catch (err) {
            error('Error caught in updateUser controller: ' + err);
            throw err;
        }
    }
}

export default UserController;
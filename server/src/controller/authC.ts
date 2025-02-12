import User from "../models/userM";
import { info,error } from "../utils/logger";
import { IUser } from "../models/userM";
import { hashUserPassword,matchUserPassword, signJwtToken } from "../utils/auth";

class AuthController {
    async login (email:string, password: string) {
        try {
            if(!email || !password) throw 'Email and password are required';
            info('Email: '+ email + ' Password: '+ password);
            const user = await User.findOne({email});
            if(!user) throw 'User does not exist!';
            const isPasswordMatched = matchUserPassword(password, user.hash);
            if(!isPasswordMatched) throw 'Invalid password';
            const jwtToken = signJwtToken(user._id.toString(),user.hash)
            user.token = jwtToken;
            const newUser = await user.save();
            return newUser;

        } catch (err) {
            error('Error caught in login controller: '+err);
            throw err;
        }
    }

    async signup (user:IUser) {
        try {
            const {password} = user;
            const passHash = hashUserPassword(password!);
            user.hash = passHash;
            const newUser = new User(user);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (err) {
            error('Error caught in signup controller: '+err);
            throw err;
        }
    }

    async changePassword(id:string, oldPassword:string, password:string) {
        try {
            info('ID: '+id);
            if(!id) throw 'Id is required';
            const user = await User.findById(id);
            if(!user) throw 'User does not exist';
            console.info('User fetched successfully: ', user);
            const {hash} = user;
            const isPasswordMatched = matchUserPassword(oldPassword,hash);
            if(!isPasswordMatched) throw 'Your old password is incorrect';
            const hashedPassword = hashUserPassword(password);
            user.hash = hashedPassword;
            const signedToken = signJwtToken(user._id.toString(), user.hash);
            user.token = signedToken;
            const savedUser = await new User(user).save();
            info('Saved user: '+savedUser);
            return savedUser;
        } catch (err) {
            error('Error caught in changePassword controller: '+err);
            throw err;
        }
    }
}

export default AuthController;
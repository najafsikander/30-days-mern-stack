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

        } catch (error) {
            console.error('Error caught in login controller: '+error);
            throw error;
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
        } catch (error) {
            console.error('Error caught in signup controller: '+error);
            throw error;
        }
    }
}

export default AuthController;
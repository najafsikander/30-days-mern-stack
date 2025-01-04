import User from "../models/User";

class UserController {

    async getAllUsers(){
        try {
            const users = await User.find();
            console.log('Users: ',users);
            return users;
        } catch (err) {
            console.warn('Error caught in getAllUsers controller', err);
        }
    }
}

export default UserController;
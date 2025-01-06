import User from "../models/User";
import { info } from "../utils/logger";
class UserController {

    async getAllUsers(){
        try {
            const users = await User.find();
            console.log('Users: ',users);
            info('Data: ' + users);
            return users;
        } catch (err) {
            console.warn('Error caught in getAllUsers controller', err);
            throw err;
        }
    }
}

export default UserController;
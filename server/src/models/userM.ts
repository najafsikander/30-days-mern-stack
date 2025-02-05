import {Schema, model} from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    token: string;
    password?: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, index:true, dropDups: true},
    hash: {type: String, required: true},
    token: {type: String, required: false}
},
{
    timestamps:true
});

const User = model<IUser>('User', userSchema);

export default User;



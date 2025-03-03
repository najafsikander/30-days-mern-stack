import {Schema, model} from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    role:string;
    token: string;
    password?: string;
    profilePic?: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, index:true, dropDups: true},
    role: {type: String, default: 'viewer'},
    hash: {type: String, required: true},
    token: {type: String, required: false},
    profilePic: {type: String}
},
{
    timestamps:true
});

const User = model<IUser>('User', userSchema);

export default User;



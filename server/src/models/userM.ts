import {Schema, model} from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, index:true, dropDups: true}
},
{
    timestamps:true
});

const User = model<IUser>('User', userSchema);

export default User;



import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUND, SECRET } from './config';

export const hashUserPassword = (password:string):string => {
    const saltRounds= Number(SALT_ROUND) || 10;
    const generatedSalt = bcrypt.genSaltSync(saltRounds)
    const hashedPass = bcrypt.hashSync(password, generatedSalt);
    return hashedPass;
}

export const matchUserPassword = (password: string, hash: string):boolean => {
    return bcrypt.compareSync(password, hash);
}

export const signJwtToken = (userId:string, hash:string):string => {
    const secret= SECRET;
    const payload = {userId, hash};
    const token = jwt.sign(payload,secret!.toString(),{expiresIn: '24h'});
    return token;
}

// export {hashUserPassword, matchUserPassword};
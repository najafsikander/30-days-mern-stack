import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashUserPassword = (password:string):string => {
    const saltRounds= Number(process.env.SALT_ROUND) || 10;
    const generatedSalt = bcrypt.genSaltSync(saltRounds)
    const hashedPass = bcrypt.hashSync(password, generatedSalt);
    return hashedPass;
}

export const matchUserPassword = (password: string, hash: string):boolean => {
    return bcrypt.compareSync(password, hash);
}

export const signJwtToken = (userId:string, hash:string):string => {
    const secret= process.env.SECRET;
    const payload = {userId, hash};
    const token = jwt.sign(payload,secret!.toString(),{expiresIn: 60 * 2});
    return token;
}

// export {hashUserPassword, matchUserPassword};
import { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';


import { VendorPayload } from '../dto';
import { AuthPayLoad } from '../dto/Auth.dto';




export const GenerateSalt = async () => {
    const salt = await bcrypt.genSalt()
    return salt
}


export const GeneratePassword = async (password: string, salt: string) => {
    const hash = await bcrypt.hash(password, salt)
    return hash
}


export const ValidatePassword = async ( enteredPassword: string, savedPassword: string, salt: string ) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword
}


export const GenerateSignature = (payload: VendorPayload) => {
    const signature = jwt.sign(payload, APP_SECRET, {expiresIn: '1d'})
    return signature
}



export const ValidateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
            req.user = payload as AuthPayLoad
            return true;
        } catch(err){
            return false
        } 
    }
    return false
};

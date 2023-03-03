import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index';
import { VendorPayload } from '../dto';


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
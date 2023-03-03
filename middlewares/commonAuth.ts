import { Request, Response, NextFunction } from 'express'
import { AuthPayLoad } from '../dto/Auth.dto';
import { ValidateSignature } from '../utility';






export const Authenticate = async(req: Request, res: Response, next: NextFunction) => {
    
    const validate = await ValidateSignature(req)

    if(validate){
        next()
    } else {
        return res.json({"message": "User not authorized"})
    }

}
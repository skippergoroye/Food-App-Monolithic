import { Request, Response, NextFunction } from 'express';
import { vendorLoginInputs } from '../dto';
import { Vendor } from "../models";
import { ValidatePassword } from '../utility';

export const vendorLogin = async( req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <vendorLoginInputs>req.body;

    // check if user exist with the email
    const existingVendor = await Vendor.findOne({ email: email})

    if(existingVendor !== null){
        // Check if password match with the one stored in the database
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt)

        if(validation) {
            return res.json(existingVendor)
        } else { 
            return res.json({ "message": "password is not valid"})
        }
    }
    return res.json({ "message": "Login credential not valid"})
}



export const GetVendorProfile =  async(req: Request, res: Response, next: NextFunction) => {
     

}

export const UpdateVendorProfile =  async(req: Request, res: Response, next: NextFunction) => {
    
}


export const UpdateVendorService =  async(req: Request, res: Response, next: NextFunction) => {
    
}
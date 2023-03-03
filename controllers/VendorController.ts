import { Request, Response, NextFunction } from 'express';
import { EditVendorInput, vendorLoginInputs } from '../dto';
import { CreateFoodInputs } from '../dto/Food.dto';
import { Food, Vendor } from "../models";
import { ValidatePassword } from '../utility';
import { GenerateSignature } from '../utility/PasswordUtility';
import { FindVendor } from './AdminController';





export const vendorLogin = async( req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <vendorLoginInputs>req.body;

    // check if user exist with the email
    const existingVendor = await Vendor.findOne({ email: email})

    if(existingVendor !== null){
        // Check if password match with the one stored in the database
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt)

        if(validation) {
            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name,
            })
            return res.json({
                message: "Login Successful",
                signature
            })

        } else { 
            return res.json({ "message": "password is not valid"})
        }
    }
    return res.json({ "message": "Login credential not valid"})
}



export const GetVendorProfile =  async(req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){
        const existingVendor = await FindVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({"message": "Vendor information not found"})
}






export const UpdateVendorProfile =  async (req: Request, res: Response, next: NextFunction) => {

    const { foodTypes, name, address, phone } = <EditVendorInput>req.body;

    const user = req.user;


    if(user){
         // Check if vendor Already Exist
         const existingVendor = await Vendor.findById(user._id)

        //  const existingVendor = await FindVendor(user._id)

        if(existingVendor !== null){
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes

            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }

        return res.json(existingVendor)
    }
    return res.json({ "message": "Vendor information Not found" })
}


export const UpdateVendorService =  async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user){
        const existingVendor = await Vendor.findById(user._id)

        if(existingVendor !== null){
            existingVendor.serviceAvailable = !existingVendor?.serviceAvailable
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }
    return res.json({ "message": "Vendor Information Not found"})
    
}



export const AddFood =  async(req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if(user){
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body;

         // Check if vendor Already Exist
         // const existingVendor = await FindVendor(user._id)
         const vendor = await Vendor.findById(user._id)

         if(vendor !== null){
            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: ['mock.jpg'],
                readyTime: readyTime,
                price: price,
                rating: 0
            })

            vendor.foods.push(createdFood)
            const result = await vendor.save()
            return res.json(result)
        }
    }

    return res.json({ "message": "Something went wrong with add food"})   
}








export const GetFoods =  async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user){
        const foods = await Food.find({ vendorId: user._id })

        if(foods !== null){
            return res.json(foods)
        }

    }
    
    return res.json({ "message": "Foods information Not Found"})
    
}




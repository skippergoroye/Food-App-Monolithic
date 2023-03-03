import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSalt, GeneratePassword } from '../utility/PasswordUtility';


// custom
export const FindVendor = async(id: string | undefined, email?: string) => {
  if(email){
    return await Vendor.findOne({ email: email })
  } else {
    return await Vendor.findById(id)
  }
}




export const CreateVendor = async ( req: Request, res: Response, next: NextFunction ) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;

  // Check if vendor Already Exist
  // const existingVendor = await Vendor.findOne({ email: email })

  // Check if vendor Already Exist
  const existingVendor = await FindVendor('', email);

  if(existingVendor !== null){
    return res.json({ "message": "A vendor already exist with the eamil ID"})
  }


  // Generate a Salt
  const salt = await GenerateSalt()
  const userPassword = await GeneratePassword(password, salt)


  // Create User
  const createVendor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: []
  })

  return res.json({ createVendor })

//   console.log(req.body)
};



export const GetVendors = async ( req: Request, res: Response, next: NextFunction ) => {
  const vendors = await Vendor.find()

  if(vendors !== null){
    return res.json(vendors)
  }

  return res.json({ "message": "vendors data not avaliable" })
  
};





export const GetVendorByID = async ( req: Request, res: Response, next: NextFunction ) => {
    const vendorId = req.params.id;

    // find vendor By Id
    // const vendor = await Vendor.findById(vendorId)

    const vendor = await FindVendor(vendorId)

    if(!vendor !== null){
      return res.json(vendor)
    }

    return res.json({ "message": "Vendor data not avaliable" })
};

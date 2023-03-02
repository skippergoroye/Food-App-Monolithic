import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";


export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;

  // Check if vendor Already Exist
  const existingVendor = await Vendor.findOne({ email: email })

  if(existingVendor !== null){
    return res.json({ "message": "A vendor already exist with the eamil ID"})
  }

  const createVendor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: password,
    salt: 'jkkjjkjkjkjjjk',
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: []
  })

  return res.json({ createVendor })

//   console.log(req.body)
};



export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};





export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

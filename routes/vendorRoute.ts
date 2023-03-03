import express, { Request, Response, NextFunction } from 'express';
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, vendorLogin } from '../controllers';


const router = express.Router()

router.post('/login', vendorLogin);

router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('service', UpdateVendorService)


router.get('/', (req: Request, res: Response, next: NextFunction)=> {
    res.json({ message: "Hello from Vendor" })
})


export { router as VendorRoute }
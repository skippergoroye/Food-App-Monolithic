import express, { Request, Response, NextFunction } from 'express';
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares/commonAuth';
import { AddFood, GetFoods } from '../controllers';



const router = express.Router()

router.post('/login', vendorLogin);


router.use(Authenticate)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)



router.post('/food', AddFood)
router.get('/foods', GetFoods)


router.get('/', (req: Request, res: Response, next: NextFunction)=> {
    res.json({ message: "Hello from Vendor" })
})


export { router as VendorRoute }
import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvaliability, GetFoodIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers';




const router = express.Router()

/** -----------------------  Food Availability ----------------------------------- **/
router.get('/:pincode', GetFoodAvaliability)


/** -----------------------  Top Restaurants  ----------------------------------- **/
router.get('/top-restaurants/:pincode', GetTopRestaurants)


/** -----------------------  Food Available in 30 Minutes  ---------------------- **/
router.get('/foods-in-30-min/:pincode', GetFoodIn30Min)


/** ---------------------------------  Search Foods  ---------------------------- **/
router.get('/search/:pincode', SearchFoods)


/** ---------------------------------  Find Restaurant By ID  ---------------------------- **/
router.get('/resturant/:id', RestaurantById)





export { router as ShoppingRoute }
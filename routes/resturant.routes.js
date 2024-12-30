import { Router } from "express";
import {getAllRestaurant, getRestaurant, getRestaurantCategories, getRestaurantItems} from '../controllers/resturant.controller.js';

const router = Router();


router.get('/', getAllRestaurant);
router.get('/get/:resturantId', getRestaurant);
router.get('/items/:restaurantId', getRestaurantItems);


export default router;
import { Router } from "express";
import {getRecommendedItems, getRapidFeast, getFoodItem} from '../controllers/food.controller.js';

const router = Router();


router.get('/recommendations/:userId', getRecommendedItems );
router.get('/rapid', getRapidFeast);
router.get('/:itemId', getFoodItem);


export default router;
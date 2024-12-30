import { Router } from "express";
import {register, login, preferences} from '../controllers/user.controller.js';

const router = Router();


router.get('/recommendations/:userId', register);
router.post('/rapid', login);
router.post('/:userId', preferences);


export default router;
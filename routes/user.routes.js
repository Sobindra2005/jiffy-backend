import { Router } from "express";
import {register, login, preferences} from '../controllers/user.controller.js';

const router = Router();


router.post('/register', register);
router.post('/login', login);
router.post('/preferences/:userId', preferences);


export default router;
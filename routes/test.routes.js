import { Router } from "express";
import {createItem, createResturaunt} from '../controllers/test.controller.js';

const router = Router();

router.post("/createRes", createResturaunt)
router.post("/createItem", createItem)


export default router;
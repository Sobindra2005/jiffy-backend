import express from "express";
import {
  createAchievement,
  getUserAchievements,
} from "../controllers/achievement.controller.js";

const router = express.Router();

router.post("/", createAchievement);
router.get("/:userId", getUserAchievements)

export default router;

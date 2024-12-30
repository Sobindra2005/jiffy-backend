import express, { Router } from "express";

const router = Router();

router.get("/:userId");
router.patch(":userId");

export default router;

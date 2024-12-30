const express = require('express');
const { login, Signup } = require('../controllers/loginSignup');
const { getAchievementsByUserId, addAchievementToUser } = require('../controllers/achievements');
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Username and password are required
 *       404:
 *         description: User unauthenticated
 */

/**
 * @swagger
 * /achievements/{id}:
 *   get:
 *     summary: Get achievements by user ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Achievements retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /achievements/{id}:
 *   put:
 *     summary: Add an achievement to a user
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               achievement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Achievement added successfully
 *       404:
 *         description: User not found
 */


router.post('/signup', Signup);
router.post('/login', login);
router.get('/achievements/:id', getAchievementsByUserId);
router.put(`/achievements/:id`, addAchievementToUser);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               fitnessGoals:
 *                 type: string
 *               currentActivityLevel:
 *                 type: string
 *               dietaryPreferences:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Error creating the user
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user or admin
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /save-bmi:
 *   post:
 *     summary: Save user's BMI
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               bmi:
 *                 type: number
 *     responses:
 *       200:
 *         description: BMI updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating BMI
 */

/**
 * @swagger
 * /fitness-survey:
 *   post:
 *     summary: Submit fitness survey data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               gender:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               fitnessGoals:
 *                 type: string
 *               currentActivityLevel:
 *                 type: string
 *               dietaryPreferences:
 *                 type: string
 *     responses:
 *       200:
 *         description: Survey data updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating survey data
 */

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get user details by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user data
 */

/**
 * @swagger
 * /update-weight:
 *   post:
 *     summary: Update or add a weight entry
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               weight:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Weight updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating weight
 */

/**
 * @swagger
 * /get-weights:
 *   get:
 *     summary: Get weights for a user
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weights retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving weights
 */

/**
 * @swagger
 * /save-workout-plan:
 *   post:
 *     summary: Save user's workout plan
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               workoutPlan:
 *                 type: object
 *     responses:
 *       200:
 *         description: Workout plan updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating workout plan
 */

/**
 * @swagger
 * /get-workout-plan/{username}:
 *   get:
 *     summary: Get user's workout plan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout plan retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving workout plan
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User-related operations
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
 *         description: Error creating user
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as user or admin
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
 * /users/{username}:
 *   get:
 *     summary: Get a user's profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile returned
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user
 */

/**
 * @swagger
 * /users/{username}/survey:
 *   put:
 *     summary: Update a user's survey data
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               gender: Male
 *               height: 180
 *               weight: 75
 *               dietaryPreferences: Vegetarian
 *               currentActivityLevel: Active
 *               fitnessGoals: Lose fat
 *     responses:
 *       200:
 *         description: Survey data updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating survey
 */

/**
 * @swagger
 * /users/{username}/bmi:
 *   put:
 *     summary: Update a user's BMI
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bmi]
 *             properties:
 *               bmi:
 *                 type: number
 *     responses:
 *       200:
 *         description: BMI updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating BMI
 */

/**
 * @swagger
 * /users/{username}/weights:
 *   put:
 *     summary: Update or add a weight entry
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [weight, date]
 *             properties:
 *               weight:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Weight updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating weight
 */

/**
 * @swagger
 * /users/{username}/weights:
 *   get:
 *     summary: Get a user's weight history
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weight data retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving weights
 */

/**
 * @swagger
 * /users/{username}/workout-plan:
 *   put:
 *     summary: Update a user's workout plan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workoutPlan:
 *                 type: object
 *                 example:
 *                   monday: Chest
 *                   tuesday: Back
 *     responses:
 *       200:
 *         description: Workout plan updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating workout plan
 */

/**
 * @swagger
 * /users/{username}/workout-plan:
 *   get:
 *     summary: Get a user's workout plan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout plan retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving workout plan
 */

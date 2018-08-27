import authMiddleware from '../config/auth-middleware';
import userController from '../controllers/user.controller';
import validators from '../config/validators';
import express from 'express';
const router = express.Router();

router.route('/register')
    /** POST /user/register - Register user */
    .post(validators.register, userController.register);

router.route('/login')
    /** GET /user/login - Check if logged in */
    .get(userController.isLoggedIn)
    /** POST /user/login - Log in */
    .post(userController.login);

router.route('/logout')
    /** GET /user/logout - Log out user */
    .get(userController.logout);

router.route('/profile')
    /** GET /user/profile - Get user profile */
    .get(authMiddleware, userController.profile);

router.route('/add-food')
    /** POST /user/add-food - Add food to user diary */
    .post(authMiddleware, userController.addFood);

router.route('/set-goal')
    .post(authMiddleware, userController.setGoal);

router.route('/get-day')
    /** POST /user/get-day - Get diary for specific day */
    .post(authMiddleware, userController.getDay);

router.route('/set-meal-types')
    /** POST /user/set-meal-types - Set preferred user meal types */
    .post(authMiddleware, userController.setMealTypes);

export default router;
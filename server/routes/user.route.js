import validate from 'express-validation';
import express from 'express';

import authMiddleware from '../config/auth-middleware';
import userController from '../controllers/user.controller';
import validators from '../config/validators';

const router = express.Router();

router.route('/register')
    /** POST /user/register - Register user */
    .post(validate(validators.register), userController.register);

router.route('/login')
    /** GET /user/login - Check if logged in */
    .get(userController.isLoggedIn)
    /** POST /user/login - Log in */
    .post(validate(validators.login), userController.login);

router.route('/logout')
    /** GET /user/logout - Log out user */
    .get(userController.logout);

router.route('/profile')
    /** GET /user/profile - Get user profile */
    .get(authMiddleware, userController.profile);

router.route('/add-food')
    /** POST /user/add-food - Add food to user diary */
    .post(validate(validators.addFood), authMiddleware, userController.addFood);

router.route('/set-goal')
    .post(validate(validators.setGoal), authMiddleware, userController.setGoal);

router.route('/get-day')
    /** POST /user/get-day - Get diary for specific day */
    .post(validate(validators.getDay), authMiddleware, userController.getDay);

router.route('/set-meal-types')
    /** POST /user/set-meal-types - Set preferred user meal types */
    .post(validate(validators.setMealTypes), authMiddleware, userController.setMealTypes);

export default router;
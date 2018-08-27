import foodController from '../controllers/food.controller';
import authMiddleware from '../config/auth-middleware';
import express from 'express';
const router = express.Router();

router.route('/get-food')
    /** POST /food/get-food - Get food */
    .post(authMiddleware, foodController.getFood);

router.route('/search')
    /** POST /food/search - Search for food */
    .post(authMiddleware, foodController.search);

export default router;
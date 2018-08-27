import validate from 'express-validation';
import express from 'express';

import foodController from '../controllers/food.controller';
import authMiddleware from '../config/auth-middleware';
import validators from '../config/validators';

const router = express.Router();

router.route('/get-food')
    /** POST /food/get-food - Get food */
    .post(validate(validators.getFood), authMiddleware, foodController.getFood);

router.route('/search')
    /** POST /food/search - Search for food */
    .post(validate(validators.search), authMiddleware, foodController.search);

export default router;
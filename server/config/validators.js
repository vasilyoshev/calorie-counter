import Joi from 'joi';

const validators = {};

validators.register = {
    body: {
        fname: Joi.string(),
        lname: Joi.string(),
        username: Joi.string().min(3),
        email: Joi.string().email(),
        password: Joi.string()
    }
};

validators.login = {
    body: {
        username: Joi.string(),
        password: Joi.string(),
        remember: Joi.bool()
    }
};

validators.addFood = {
    body: {
        food: {
            name: Joi.string(),
            calories: Joi.number(),
            protein: Joi.number(),
            carbs: Joi.number(),
            fat: Joi.number(),
        },
        quantity: Joi.number(),
        type: Joi.string(),
        date: Joi.date()
    }
};

export default validators;
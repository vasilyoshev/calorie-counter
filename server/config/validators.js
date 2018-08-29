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
        food: Joi.object({
            name: Joi.string(),
            calories: Joi.number(),
            protein: Joi.number(),
            carbs: Joi.number(),
            fat: Joi.number()
        }),
        quantity: Joi.number(),
        type: Joi.string(),
        date: Joi.date()
    }
};

validators.setGoal = {
    body: {
        username: Joi.string(),
        calories: Joi.number(),
        protein: Joi.number(),
        carbs: Joi.number(),
        fat: Joi.number()
    }
};

validators.getDay = {
    body: {
        date: Joi.date()
    }
};

validators.setMealTypes = {
    body: {
        mealTypes: Joi.array().items(Joi.string())
    }
};

validators.getFood = {
    body: {
        ndbno: Joi.string()
    }
};

validators.search = {
    body: {
        term: Joi.string(),
        max: Joi.number(),
        offset: Joi.number()
    }
};

export default validators;
import request from 'request';

const controller = {};

/**
 * Get food by it's USDA id number.
 * 
 * @property {Array<string>} req.body.ndbno - USDA id of the food.
 */
controller.getFood = (req, res) => {
    let options = {
        url: `https://api.nal.usda.gov/fdc/v1/food/${req.body.ndbno}`,
        method: 'GET',
        qs: {
            'api_key': 'OKDH3hz2fZRJJorrsJbQbGD1LegtWX4zNhsVb4OL',
        }
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            res.json({
                name: body.description,
                calories: body.foodNutrients.find((nutrient) => nutrient.nutrient.name.toLowerCase().includes('energy')).nutrient.number,
                protein: body.foodNutrients.find((nutrient) => nutrient.nutrient.name.toLowerCase().includes('protein')).nutrient.number,
                carbs: body.foodNutrients.find((nutrient) => nutrient.nutrient.name.toLowerCase().includes('carb')).nutrient.number,
                fat: body.foodNutrients.find((nutrient) => nutrient.nutrient.name.toLowerCase().includes('fat')).nutrient.number
            });
        } else {
            res.status(500).json({
                message: 'An error occured.'
            });
        }
    });
};

/**
 * 
 * @property {Array<string>} req.body.term - Query to be searched for.
 * @property {Array<string>} req.body.max - Maximum number of results to return.
 * @property {Array<string>} req.body.offset - Index from which to start the return list from results.
 */
controller.search = (req, res) => {
    let options = {
        url: 'https://api.nal.usda.gov/fdc/v1/search',
        method: 'GET',
        qs: {
            'pageSize': req.body.max,
            'api_key': 'OKDH3hz2fZRJJorrsJbQbGD1LegtWX4zNhsVb4OL',
            'query': req.body.term,
            'pageNumber': req.body.offset || 0
        }
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            if (!body.errors) {
                res.json({
                    results: body.foods,
                    total: body.totalHits
                });
            } else {
                res.json({
                    results: [],
                    total: 0
                });
            }
        } else {
            res.status(500).json({
                message: 'An error occured.'
            });
        }
    });
};

export default controller;
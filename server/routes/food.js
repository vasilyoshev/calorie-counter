const express = require('express');
const router = express.Router();
var request = require('request');
const authMiddleware = require('../config/auth-middleware')

router.post('/getFood', authMiddleware, (req, res, next) => {
    var options = {
        url: 'https://api.nal.usda.gov/ndb/V2/reports',
        method: 'GET',
        qs: {
            'api_key': '4ZJRDE57fjl6yCZbsKZa5ocNKLU3gLHuZkqvnioo',
            'ndbno': req.body.ndbno,
            'type': 'f'
        }
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            if (body.notfound !== 1) {
                const food = {
                    name: body.foods[0].food.desc.name,
                    calories: body.foods[0].food.nutrients[1].value,
                    protein: body.foods[0].food.nutrients[3].value,
                    carbs: body.foods[0].food.nutrients[6].value,
                    fat: body.foods[0].food.nutrients[4].value
                }
                res.json({
                    food: food
                });
            } else {
                res.status(400).json({
                    msg: body.foods[0].error
                });
            }
        }
    })
});

router.post('/search', authMiddleware, (req, res, next) => {
    var options = {
        url: 'https://api.nal.usda.gov/ndb/search',
        method: 'GET',
        qs: {
            'max': req.body.max,
            'api_key': '4ZJRDE57fjl6yCZbsKZa5ocNKLU3gLHuZkqvnioo',
            'q': req.body.term,
            'ds': 'Standard Reference',
            'sort': 'r'
        }
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            if (!body.errors) {
                res.json({
                    results: body.list.item
                });
            } else {
                res.json({
                    results: []
                });
            }
        }
    })
});

module.exports = router;
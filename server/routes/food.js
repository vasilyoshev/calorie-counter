const express = require('express');
const request = require('request');
const authMiddleware = require('../config/auth-middleware')
const router = express.Router();

router.post('/getFood', authMiddleware, (req, res) => {
    let options = {
        url: 'https://api.nal.usda.gov/ndb/V2/reports',
        method: 'GET',
        qs: {
            'api_key': '4ZJRDE57fjl6yCZbsKZa5ocNKLU3gLHuZkqvnioo',
            'ndbno': req.body.ndbno,
            'type': 'f'
        }
    }

    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            if (body.notfound === 0) {
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
                    message: 'Food was not found.'
                });
            }
        } else {
            res.status(500).json({
                message: 'An error occured.'
            });
        }
    })
});

router.post('/search', authMiddleware, (req, res) => {
    let options = {
        url: 'https://api.nal.usda.gov/ndb/search',
        method: 'GET',
        qs: {
            'max': req.body.max,
            'api_key': '4ZJRDE57fjl6yCZbsKZa5ocNKLU3gLHuZkqvnioo',
            'q': req.body.term,
            'ds': 'Standard Reference',
            'sort': 'r',
            'offset': req.body.offset || 0
        }
    }

    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            if (!body.errors) {
                res.json({
                    results: body.list.item,
                    total: body.list.total
                });
            } else {
                res.json({
                    results: [],
                    total: 0
                });
            }
        } else {
            res.status(500).json({
                message: 'An error has occured.'
            })
        }
    })
});

module.exports = router;
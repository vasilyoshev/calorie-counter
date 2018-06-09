const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Food = require('../entities/food');
var request = require('request');

/**
 * Checks if user is logged in, by checking if user is stored in session.
 */
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'You must be logged in.'
        });
    }
};

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
            if (!body.errors) {
                res.json({
                    food: body
                });
            } else {
                res.json({
                    food: []
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
            'max': 5,
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
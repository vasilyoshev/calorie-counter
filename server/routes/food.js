const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Food = require('../entities/food');

/**
 * Checks if user is logged in, by checking if user is stored in session.
 */
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'You must be logged in.'
        });
    }
};

module.exports = router;
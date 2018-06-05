const express = require('express');
const router = express.Router();
// const config = require('../config/database');
const User = require('../entities/user');
const Goal = require('../entities/goal');

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

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: "user"
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Failed to register user'
            });
        } else {
            res.json({
                success: true,
                message: 'User registered'
            });
        }
    });
});

router.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({ loggedIn: true }) : res.status(200).send({ loggedIn: false });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Authentication failed.'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                let userRes = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    goal: user.goals.length ? user.goals[user.goals.length - 1] : {}
                }
                req.session.user = userRes;
                if (req.body.remember) {
                    req.session.cookie.maxAge = null;
                }
                res.status(200).send({
                    success: true,
                    user: userRes
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Authentication failed.'
                });
            }
        });
    });
});

router.post('/logout', authMiddleware, (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Could not log out.'
            });
        } else {
            res.status(200).json({
                success: true
            });
        }
    });
});

router.get('/profile', authMiddleware, (req, res) => {
    User.getUserByUsername(req.session.user.username, (err, user) => {
        res.json({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            goal: user.goals.length ? user.goals[user.goals.length - 1] : {}
        });
    });
});

router.post('/set-goal', authMiddleware, (req, res) => {
    const username = req.body.username;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }

        let newGoal = new Goal({
            calories: req.body.calories,
            protein: req.body.protein,
            carbs: req.body.carbs,
            fat: req.body.fat,
        });

        Goal.addGoal(newGoal, user, (err, user) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Failed to add goal'
                });
            } else {
                console.log(user);
                res.json({
                    success: true,
                    message: 'Goal added',
                    user: user
                });
            }
        });
    });
})

module.exports = router;
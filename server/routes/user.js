const express = require('express');
const router = express.Router();
// const config = require('../config/database');
const User = require('../models/user');
const Goal = require('../models/goal');

/**
 * Checks if user is logged in, by checking if user is stored in session.
 */
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.username) {
        req.session.views++;
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'You must be logged in.'
        });
    }
};

router.post('/register', (req, res, next) => {
    let usernameUsed;
    let emailUsed;
    User.find({ username: req.body.username }, (err, user) => {
        if (user.length) usernameUsed = true;
        else usernameUsed = false;

        User.find({ email: req.body.email }, (err, user) => {
            if (user.length) emailUsed = true;
            else emailUsed = false;

            if (usernameUsed || emailUsed) {
                return res.status(400).json({
                    success: false,
                    usernameUsed: usernameUsed,
                    emailUsed: emailUsed
                });
            }

            let newUser = new User({
                fname: req.body.fname,
                lname: req.body.lname,
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
    });
});

router.get('/login', (req, res) => {
    req.session.username ? res.status(200).send({ loggedIn: true }) : res.status(200).send({ loggedIn: false });
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
                    name: user.fname + " " + user.lname,
                    username: user.username,
                    email: user.email,
                    goal: user.goals.length ? user.goals[user.goals.length - 1] : {}
                }
                req.session.username = user.username;
                req.session.views = 1;
                if (req.body.remember) {
                    req.session.cookie.maxAge = null;
                }
                res.status(200).send({
                    success: true
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

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.json({ success: true });
});

router.get('/profile', authMiddleware, (req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        res.json({
            id: user.id,
            fname: user.fname,
            lname: user.lname,
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
            fat: req.body.fat
        });

        User.addGoal(newGoal, user, (err, user) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Failed to add goal'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Goal added',
                    goal: user.goals[user.goals.length - 1]
                });
            }
        });
    });
})

module.exports = router;
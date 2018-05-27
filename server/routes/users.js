const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

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
            res.json({
                success: false,
                msg: 'Failed to register user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }

            if (isMatch) {
                var claims = {
                    sub: user._id,
                    permissions: user.role
                };

                const token = jwt.sign(claims, config.secret, {
                    expiresIn: 6000000 // 15 minutes
                });
                res.cookie('jwt', token);

                res.json({
                    success: true,
                    token: 'JWT ' + token
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Authentication failed.'
                });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.json('success');
})

module.exports = router;
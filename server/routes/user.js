const express = require('express');
const authMiddleware = require('../config/auth-middleware')
const User = require('../models/user');
const Goal = require('../models/goal');
const Meal = require('../models/meal');
const Food = require('../models/food');
const router = express.Router();

router.post('/register', (req, res) => {
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

router.post('/addFood', authMiddleware, (req, res) => {

    Food.getFoodByName(req.body.food.name, (err, food) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Could not get food'
            });
        }

        if (!food) {
            food = new Food({
                name: req.body.food.name,
                calories: req.body.food.calories,
                protein: req.body.food.protein,
                carbs: req.body.food.carbs,
                fat: req.body.food.fat
            });
            Food.createFood(food, (err, food) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to add food'
                    });
                }
            });
        }

        User.getUserByUsername(req.session.username, (err, user) => {
            if (user.meals.length) {
                const today = new Date().setHours(0, 0, 0, 0);
                for (let i = user.meals.length - 1; i >= 0; i--) {
                    const meal = user.meals[i];
                    if (meal.date.setHours(0, 0, 0, 0) !== today) break;
                    if (meal.type === req.body.type) {
                        User.addFood(food, i, user, (err, user) => {
                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'Failed to add food'
                                });
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Food added'
                                });
                            }
                        });
                        return;
                    }
                }
            }

            let meal = new Meal({
                type: req.body.type,
                foods: [food]
            });

            User.addMeal(meal, user, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to add meal'
                    });
                } else {
                    return res.json({
                        success: true,
                        message: 'Meal added'
                    });
                }
            });
        });
    });
});

router.post('/set-goal', authMiddleware, (req, res) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Failed to get user'
            });
        }

        let newGoal = new Goal({
            calories: req.body.calories,
            protein: req.body.protein,
            carbs: req.body.carbs,
            fat: req.body.fat
        });

        User.addGoal(newGoal, user, (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to add goal'
                });
            } else {
                return res.json({
                    success: true,
                    message: 'Goal added',
                    goal: user.goals[user.goals.length - 1]
                });
            }
        });
    });
})

module.exports = router;
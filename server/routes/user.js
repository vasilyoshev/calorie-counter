const nodemailer = require('nodemailer');
const fs = require('fs');
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
                    fs.readFile('pass.txt', 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'vyoshev.caloriecounter@gmail.com',
                                pass: data
                            }
                        });

                        let mailOptions = {
                            from: 'vyoshev.caloriecounter@gmail.com',
                            to: req.body.email,
                            subject: 'New account in Calorie Counter',
                            text: req.body.fname + ', thank you for registering! Enjoy tracking calories.'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });

                        res.json({
                            success: true,
                            message: 'User registered'
                        });
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
            mealTypes: user.mealTypes,
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
                let startOfDay = new Date(req.body.date).setHours(0, 0, 0, 0);
                // startOfDay + 1 day - 1 ms
                let endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

                for (let i = user.meals.length - 1; i >= 0; i--) {
                    const meal = user.meals[i];

                    // if meal date is after desired day => go to next meal
                    if (meal.date > endOfDay) continue;
                    // if meal date is before desired day => no meal => go to create meal
                    if (meal.date < startOfDay) break;

                    if (meal.type === req.body.type) {
                        User.addFood(food, req.body.quantity, i, user, (err, user) => {
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
                foods: [{
                    _id: food,
                    quantity: req.body.quantity
                }],
                date: new Date(req.body.date)
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
});

router.post('/get-day', authMiddleware, (req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Failed to get user'
            });
        }

        let summary = [];
        let meals = [];
        let startOfDay = new Date(req.body.date).setHours(0, 0, 0, 0);
        // startOfDay + 1 day - 1 ms
        let endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

        let goal;
        for (let i = user.goals.length - 1; i >= 0; i--) {
            if (user.goals[i].date < endOfDay) {
                goal = user.goals[i];
                summary.push({
                    name: 'Daily Goal', calories: goal.calories,
                    protein: goal.protein, carbs: goal.carbs, fat: goal.fat
                });
                break;
            }
        }

        let calories = 0, protein = 0, carbs = 0, fat = 0;
        for (let i = user.meals.length - 1; i >= 0; i--) {
            let meal = user.meals[i]

            // if meal date is after desired day => go to next meal
            if (meal.date > endOfDay) continue;
            // if meal date is before desired day => no meal => go to create meal
            if (meal.date < startOfDay) break;

            if (meal.date <= endOfDay && meal.date >= startOfDay) {
                let foods = [];
                for (let j = 0; j < meal.foods.length; j++) {
                    let food = meal.foods[j]._id;
                    let quantity = meal.foods[j].quantity;
                    calories += (food.calories * quantity) / 100;
                    protein += (food.protein * quantity) / 100;
                    carbs += (food.carbs * quantity) / 100;
                    fat += (food.fat * quantity) / 100;
                    foods.push({
                        name: food.name,
                        quantity: quantity,
                        calories: Math.round((food.calories * quantity) / 100),
                        protein: Math.round((food.protein * quantity) / 100),
                        carbs: Math.round((food.carbs * quantity) / 100),
                        fat: Math.round((food.fat * quantity) / 100)
                    });
                }

                // push in beginning of array
                meals.unshift({
                    type: meal.type,
                    date: meal.date,
                    foods: foods
                });
            }
        }

        calories = Math.round(calories);
        protein = Math.round(protein);
        carbs = Math.round(carbs);
        fat = Math.round(fat);
        summary.push({
            name: 'Total', calories: calories, protein: protein, carbs: carbs, fat: fat
        });

        if (goal) {
            summary.push({
                name: 'Remaining', calories: goal.calories - calories,
                protein: goal.protein - protein, carbs: goal.carbs - carbs, fat: goal.fat - fat
            });
        }

        res.json({
            summary: summary,
            meals: meals
        })
    });
});

router.post('/set-meal-types', authMiddleware, (req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        user.mealTypes = req.body.mealTypes;
        user.save((err, user) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Falied to set meal types'
                });
            } else {
                res.json({
                    success: true
                });
            }
        });
    });
});

module.exports = router;
const mongoose = require('mongoose');
const MealSchema = require('mongoose').model('Meal').schema;
const GoalSchema = require('mongoose').model('Goal').schema;
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

// User schema
const UserSchema = Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    goals: [GoalSchema],
    meals: [MealSchema]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }

        callback(null, isMatch);
    });
}

module.exports.addGoal = function (newGoal, user, callback) {
    // TODO replace goal if exist on that day
    user.goals.push(newGoal);
    user.save(callback);
}

module.exports.addMeal = function (newMeal, user, callback) {
    user.meals.push(newMeal);
    user.save(callback);
}
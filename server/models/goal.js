const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Goal schema
const GoalSchema = Schema({
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);

module.exports.addGoal = function (newGoal, user, callback) {
    user.goals.push(newGoal);
    user.save(callback);
}
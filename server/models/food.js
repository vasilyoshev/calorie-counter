const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const FoodSchema = Schema({
    name: {
        type: String,
        required: true
    },
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
    }
});

const Food = module.exports = mongoose.model('Food', FoodSchema);
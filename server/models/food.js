const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const FoodSchema = Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    protein: {
        type: Number
    },
    sodium: {
        type: Number
    },
    fiber: {
        type: Number
    },
    carbohydrate: {
        type: Number
    },
    sugars: {
        type: Number
    },
    fat: {
        type: Number
    },
    water: {
        type: Number
    },
    calories: {
        type: Number
    },
    saturated: {
        type: Number
    },
    monounsat: {
        type: Number
    },
    polyunsat: {
        type: Number
    }
});

const Food = module.exports = mongoose.model('Food', FoodSchema);

// module.exports.addFood = function (newFood, callback) {
//     newFood.save(callback);
// }
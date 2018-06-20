const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MealSchema = Schema({
    type: {
        type: String,
        required: true
    },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
});

const Meal = module.exports = mongoose.model('Meal', MealSchema);

module.exports.addMeal = function (newMeal, callback) {
    newMeal.save(callback);
}
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MealSchema = Schema({
    type: {
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meal', MealSchema);
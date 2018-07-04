const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MealSchema = Schema({
    type: {
        type: String,
        required: true
    },
    foods: [{
        _id: {
            type: Schema.Types.ObjectId, ref: 'Food'
        },
        quantity: {
            type: Number
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meal', MealSchema);
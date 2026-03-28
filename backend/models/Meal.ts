import { Schema, model } from 'mongoose';

// Meal Schema for calorie log
const mealSchema = new Schema({
    foodName: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    macros: {
        type: {
            protein: { type: Number, required: true },
            carbs: { type: Number, required: true },
            fats: { type: Number, required: true },
        },
        required: true,
    },
    photoReference: {
        type: String,
        required: false,
    },
    barcodeData: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Meal = model('Meal', mealSchema);

export default Meal;
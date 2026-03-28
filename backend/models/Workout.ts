import mongoose, { Schema } from 'mongoose';

// Define the Workout schema
const workoutSchema = new Schema({
    exercises: [{
        name: { type: String, required: true }, // Name of the exercise
        sets: { type: Number, required: true }, // Number of sets
        reps: { type: Number, required: true }, // Number of reps per set
        weight: { type: Number, required: true }, // Weight used (in kg/lbs)
        duration: { type: Number, required: true } // Duration in seconds
    }],
    schedule: [{
        date: { type: Date, required: true }, // Date of the workout
        notes: { type: String } // Any additional notes
    }]
}, { timestamps: true });

// Create the Workout model
const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;

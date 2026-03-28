import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        gender: { type: String },
    },
    fitnessGoals: {
        goal: { type: String }, // e.g. lose weight, gain muscle
        targetDate: { type: Date },
        progress: { type: Number, min: 0, max: 100 },
    },
    dietaryPreferences: {
        vegetarian: { type: Boolean, default: false },
        vegan: { type: Boolean, default: false },
        allergies: [{ type: String }], // e.g. nuts, gluten
        otherPreferences: { type: String },
    },
    onboardingQuestionnaire: {
        answers: [{
            question: { type: String },
            answer: { type: String },
        }],
    },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
import { Schema, model } from 'mongoose';

const runSessionSchema = new Schema({
    distance: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    pace: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const RunSession = model('RunSession', runSessionSchema);

export default RunSession;
import express from 'express';
import { Request, Response } from 'express';
import { getDistance } from 'haversine';

const router = express.Router();

let sessions: Array<any> = [];

// Interface for a running session
interface RunningSession {
    id: string;
    startTime: string;
    endTime?: string;
    locations: Array<{ latitude: number; longitude: number; timestamp: string }>
}

// Start a new running session
router.post('/start', (req: Request, res: Response) => {
    const sessionId = new Date().getTime().toString();
    const newSession: RunningSession = {
        id: sessionId,
        startTime: new Date().toISOString(),
        locations: []
    };
    sessions.push(newSession);
    res.status(201).json(newSession);
});

// Update GPS location
router.post('/location', (req: Request, res: Response) => {
    const { sessionId, latitude, longitude } = req.body;
    const session = sessions.find(s => s.id === sessionId);

    if (!session) return res.status(404).send('Session not found');

    session.locations.push({ latitude, longitude, timestamp: new Date().toISOString() });
    res.send('Location updated');
});

// End the running session
router.post('/end', (req: Request, res: Response) => {
    const { sessionId } = req.body;
    const session = sessions.find(s => s.id === sessionId);

    if (!session) return res.status(404).send('Session not found');

    session.endTime = new Date().toISOString();
    res.send('Session ended');
});

// Calculate statistics
router.get('/:sessionId/statistics', (req: Request, res: Response) => {
    const sessionId = req.params.sessionId;
    const session = sessions.find(s => s.id === sessionId);

    if (!session) return res.status(404).send('Session not found');

    const totalDistance = calculateDistance(session.locations);
    const totalTime = session.endTime ? (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000 : 0; // in seconds
    const speed = totalTime > 0 ? totalDistance / totalTime : 0; // in distance per second
    const caloriesBurned = estimateCaloriesBurned(totalTime);

    res.json({ totalDistance, totalTime, speed, caloriesBurned });
});

// Function to calculate distance using haversine formula
function calculateDistance(locations: Array<{ latitude: number; longitude: number }>): number {
    let totalDistance = 0;
    for (let i = 0; i < locations.length - 1; i++) {
        const start = { latitude: locations[i].latitude, longitude: locations[i].longitude };
        const end = { latitude: locations[i + 1].latitude, longitude: locations[i + 1].longitude };
        totalDistance += getDistance(start, end);
    }
    return totalDistance; // in meters
}

// Function to estimate calories burned
function estimateCaloriesBurned(totalTime: number): number {
    const MET = 8; // Metabolic Equivalent for running
    const weight = 70; // Average weight in kg
    const caloriesBurned = (MET * 3.5 * weight * totalTime) / 200;
    return caloriesBurned;
}

export default router;

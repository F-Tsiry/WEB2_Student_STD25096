import express, { type Express, type Request, type Response } from 'express';
import studentController from './src/controllers/SudentController';
import dotenv from 'dotenv';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/students', studentController);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
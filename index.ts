import express from 'express';
import cors from 'cors';
import { StudentController } from './src/controllers/SudentController';
import { AuthController } from './src/controllers/AuthController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Instanciation des contrôleurs
new StudentController(app);
new AuthController(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
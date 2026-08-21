import express from 'express';
import cors from 'cors';
import { StudentController } from './src/controllers/SudentController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

new StudentController(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
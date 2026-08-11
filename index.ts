import express from 'express';
import StudentController from './src/controllers/SudentController';

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/students', StudentController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
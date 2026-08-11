import express, { type Request, type Response, type NextFunction } from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Data model interface
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

// In-memory mock data
let students: Student[] = [
  { id: 1, firstName: 'Soa', lastName: 'Rabe', age: 20 },
  { id: 2, firstName: 'Koto', lastName: 'Rakoto', age: 22 }
];

// 1. GET ALL RESOURCES (GET /students) -> 200 OK
app.get('/students', (req: Request, res: Response) => {
  res.status(200).json(students);
});

// 2. GET A SPECIFIC RESOURCE (GET /students/:id) -> 200 OK
app.get('/students/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const student = students.find((s) => s.id === id);

  if (!student) {
    const error: any = new Error('Student not found');
    error.status = 404;
    return next(error);
  }

  res.status(200).json(student);
});

// 3. CREATE A RESOURCE (POST /students) -> 201 Created
app.post('/students', (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, age } = req.body;

  if (!firstName || !lastName || age === undefined) {
    const error: any = new Error('Fields firstName, lastName, and age are required');
    error.status = 400;
    return next(error);
  }

  const newStudent: Student = {
    id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
    firstName,
    lastName,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. FULL UPDATE OF A RESOURCE (PUT /students/:id) -> 200 OK
app.put('/students/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const { firstName, lastName, age } = req.body;

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    const error: any = new Error('Student not found');
    error.status = 404;
    return next(error);
  }

  if (!firstName || !lastName || age === undefined) {
    const error: any = new Error('Full update requirement: firstName, lastName, and age are required');
    error.status = 400;
    return next(error);
  }

  students[index] = { id, firstName, lastName, age };
  res.status(200).json(students[index]);
});

// 5. PARTIAL UPDATE OF A RESOURCE (PATCH /students/:id) -> 200 OK
app.patch('/students/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    const error: any = new Error('Student not found');
    error.status = 404;
    return next(error);
  }

  const { firstName, lastName, age } = req.body;

  students[index] = {
    ...students[index],
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(age !== undefined && { age })
  };

  res.status(200).json(students[index]);
});

// 6. DELETE A RESOURCE (DELETE /students/:id) -> 204 No Content
app.delete('/students/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    const error: any = new Error('Student not found');
    error.status = 404;
    return next(error);
  }

  students = students.filter((s) => s.id !== id);
  res.status(204).send(); // 204 No Content
});

// 7. CENTRALIZED ERROR HANDLING (Global Middleware)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status,
    message
  });
});

app.listen(PORT, () => {
  console.log(`REST API server running at http://localhost:${PORT}`);
});
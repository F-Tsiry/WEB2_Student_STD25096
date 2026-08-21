import express, { Request, Response } from 'express';
import { StudentService } from '../Services/StudentService';
import { authenticate, authorize } from '../Security/AuthMiddleware';

export class StudentController {
  public router = express.Router();
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/', authenticate, this.getAll.bind(this));
    this.router.get('/:id', authenticate, this.getStudentById.bind(this));
    this.router.post('/', authenticate, authorize('ADMIN'), this.createStudent.bind(this));
    this.router.put('/:id', authenticate, authorize('ADMIN'), this.update.bind(this));
    this.router.patch('/:id', authenticate, authorize('ADMIN'), this.patch.bind(this));
    this.router.delete('/:id', authenticate, authorize('ADMIN'), this.delete.bind(this));
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.studentService.getAllStudent();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.id as string;
      const student = await this.studentService.getStudentById(studentId);

      if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.status(200).json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const newStudent = await this.studentService.createNewStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.id as string;
      const student = await this.studentService.updateStudent(studentId, req.body);
      if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.status(200).json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async patch(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.id as string;
      const student = await this.studentService.updateStudent(studentId, req.body);
      if (!student) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.status(200).json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.id as string;
      const isDeleted = await this.studentService.deleteStudent(studentId);
      if (isDeleted) {
        res.status(200).json({ message: 'Student deleted' });
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StudentController().router;
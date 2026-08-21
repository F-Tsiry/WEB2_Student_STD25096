import express, { type Express, type Request, type Response } from 'express';
import { StudentService } from '../services/StudentService';

class StudentController {
  public app: Express;
  private studentService: StudentService;

  constructor(app: Express) {
    this.app = app;
    this.studentService = new StudentService();
    this.registerRoutes(app);
  }

  private registerRoutes(app: Express): void {
    this.app.get('/', this.getAll.bind(this));
    this.app.get('/:id', this.getStudentById.bind(this));
    this.app.post('/', this.createStudent.bind(this));
    this.app.put('/:id', this.update.bind(this));
    this.app.patch('/:id', this.patch.bind(this));
    this.app.delete('/:id', this.delete.bind(this));
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

export default new StudentController(express()).app;
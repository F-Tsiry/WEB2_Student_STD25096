import express, { Express, Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
  public app: Express;
  private studentService: StudentService;

  constructor() {
    this.app = express();
    this.studentService = new StudentService();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.get('/', this.getAll);
    this.app.get('/:studentNumber', this.getByNumber);
    this.app.post('/', this.create);
    this.app.put('/:studentNumber', this.update);
    this.app.delete('/:studentNumber', this.delete);
  }

  private getAll = (req: Request, res: Response): void => {
    try {
      const students = this.studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  private getByNumber = (req: Request<{ studentNumber: string }>, res: Response): void => {
    try {
      const student = this.studentService.getStudentByNumber(req.params.studentNumber);
      res.status(200).json(student);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  private create = (req: Request, res: Response): void => {
    try {
      const newStudent = this.studentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private update = (req: Request<{ studentNumber: string }>, res: Response): void => {
    try {
      const updatedStudent = this.studentService.updateStudent(req.params.studentNumber, req.body);
      res.status(200).json(updatedStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private delete = (req: Request<{ studentNumber: string }>, res: Response): void => {
    try {
      this.studentService.deleteStudent(req.params.studentNumber);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}

export default new StudentController().app;
import express, { type Express, type Request, type Response } from 'express';
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
    this.app.get('/', async (req: Request,res: Response): Promise<void> => {
        try {
            const students = await this.studentService.getAllStudent();
            res.status(200).json(students);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
        
        }
    );

    this.app.get('/:id', async (req: Request, res: Response): Promise<void> => {

        try {
            const studentId = req.params.id as String;
            const student = await this.studentService.getStudentById(studentId);
            res.status(200).json(student);

            if (!student) {
                res.status(404).json( {error: "Not Found"} )
            }
            
        } catch (error) {
                res.status(500).json( { error: "Internal server error" } );
        }
        
    })

    this.app.post('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const newstudent = await this.studentService.createNewStudent(req.body);
            res.status(201).json(newstudent);
        } catch (error) {
            res.status(500).json({ error: "Internal server error"});
        }
    })

    this.app.put('/:id', async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id as String;
            const student = await this.studentService.updateStudent(studentId, req.body);
            res.status(200).json(student);
            if (!student) {
                res.status(404).json( {error: "Not Found"} )
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error"});
        }
    })


    this.app.delete('/:id', async (req: Request, res: Response): Promise<void> => {
        const studentId = req.params.id as String;
        const isDeleted = await this.studentService.deleteStudent(studentId);
        if(isDeleted) {
            res.status(200).json({message: "Student deleted"});
        } else {
            res.status(404).json({error: "Student not found"});
        }
    })
    
  }
}
export default new StudentController().app;
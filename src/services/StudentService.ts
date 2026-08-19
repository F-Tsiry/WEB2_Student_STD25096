import StudentRepository from '../repositories/StudentRepository'
import { Student } from '../models/StudentModel';

export class StudentService {
    private studentRepository: StudentRepository;

    constructor () {
        this.studentRepository = new StudentRepository()
    }

    public async getAllStudent(): Promise<Student[]> {
        return await this.studentRepository.findAll();   
    }
    
    public async getStudentById(id: String): Promise<Student> {
        return await this.studentRepository.findByID(id);
    }

    public async createNewStudent(studentData: Omit<Student, 'studentId'>): Promise<Student> {
        if (!studentData.firstName || !studentData.lastName) {
          throw new Error("Le prénom et le nom sont obligatoires.");
        }

        if (studentData.year < 1) {
          throw new Error("L'année d'étude doit être valide.");
        }

        const lastNum = await this.studentRepository.getLastStudentId();

        function formatStudentId(num: number): string {
            return `STD${num.toString().padStart(3, '0')}`;
        }

        const newId = formatStudentId(lastNum + 1);

        const studentToCreate: Student = {
            studentId: newId,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            birthDate: studentData.birthDate,
            year: studentData.year
        };

        return await this.studentRepository.create(studentToCreate);
        }

    public async updateStudent(studentId: String, data: Partial<Student>): Promise<Student> {
        return await this.studentRepository.update(studentId, data);
    }

    public async deleteStudent(studentId: String): Promise<Boolean> {
        return await this.studentRepository.delete(studentId);
    }
}
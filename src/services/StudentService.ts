import StudentRepository from '../repositories/StudentRepository';
import { Student } from '../models/StudentModel';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  public async getAllStudent(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  public async getStudentById(id: string): Promise<Student | null> {
    return await this.studentRepository.findByID(id);
  }

  public async createNewStudent(studentData: Omit<Student, 'studentId'>): Promise<Student> {
    if (!studentData.firstName || !studentData.lastName) {
      throw new Error('Le prénom et le nom sont obligatoires.');
    }

    if (!studentData.year || studentData.year < 1 || studentData.year > 3) {
      throw new Error("L'année d'étude doit être comprise entre 1 et 3.");
    }

    const lastNum = await this.studentRepository.getLastStudentId();
    const newId = `STD${(lastNum + 1).toString().padStart(3, '0')}`;

    const studentToCreate: Student = {
      studentId: newId,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      birthDate: studentData.birthDate,
      year: studentData.year,
    };

    return await this.studentRepository.create(studentToCreate);
  }

  public async updateStudent(studentId: string, data: Partial<Student>): Promise<Student | null> {
    return await this.studentRepository.update(studentId, data);
  }

  public async deleteStudent(studentId: string): Promise<boolean> {
    return await this.studentRepository.delete(studentId);
  }
}
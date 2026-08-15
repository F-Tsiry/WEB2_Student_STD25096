import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../models/StudentModel';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  public getAllStudents(): Student[] {
    return this.studentRepository.findAll();
  }

  public getStudentById(studentId: string): Student {
    const student = this.studentRepository.findByStudentId(studentId);
    if (!student) {
      throw new Error(`Student with Id '${studentId}' not found.`);
    }
    return student;
  }

  public createStudent(data: Student): Student {
    
    if (!data.studentId || !data.firstName || !data.lastName || !data.birthDate || data.year === undefined) {
      throw new Error('All fields are required.');
    }

    
    if (data.year < 1 || data.year > 3) {
      throw new Error('Year must be between 1 and 3.');
    }

    
    const existingStudent = this.studentRepository.findByStudentId(data.studentId);
    if (existingStudent) {
      throw new Error(`Student Id '${data.studentId}' already exists.`);
    }

    return this.studentRepository.create(data);
  }

  public updateStudent(studentId: string, data: Partial<Student>): Student {
    
    if (data.year !== undefined && (data.year < 1 || data.year > 3)) {
      throw new Error('Year must be between 1 and 3.');
    }

    const updatedStudent = this.studentRepository.update(studentId, data);
    if (!updatedStudent) {
      throw new Error(`Student with Id '${studentId}' not found.`);
    }

    return updatedStudent;
  }

  public deleteStudent(studentId: string): void {
    const isDeleted = this.studentRepository.delete(studentId);
    if (!isDeleted) {
      throw new Error(`Student with Id '${studentId}' not found.`);
    }
  }
}
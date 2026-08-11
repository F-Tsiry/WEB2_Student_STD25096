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

  public getStudentByNumber(studentNumber: string): Student {
    const student = this.studentRepository.findByStudentNumber(studentNumber);
    if (!student) {
      throw new Error(`Student with number '${studentNumber}' not found.`);
    }
    return student;
  }

  public createStudent(data: Student): Student {
    // Validation: Check required fields
    if (!data.studentNumber || !data.firstName || !data.lastName || !data.birthDate || data.year === undefined) {
      throw new Error('All fields are required.');
    }

    // Validation: Check year range (check between 1 and 3)
    if (data.year < 1 || data.year > 3) {
      throw new Error('Year must be between 1 and 3.');
    }

    // Validation: Check for existing student number
    const existingStudent = this.studentRepository.findByStudentNumber(data.studentNumber);
    if (existingStudent) {
      throw new Error(`Student number '${data.studentNumber}' already exists.`);
    }

    return this.studentRepository.create(data);
  }

  public updateStudent(studentNumber: string, data: Partial<Student>): Student {
    // Validation: Check year range if updating year
    if (data.year !== undefined && (data.year < 1 || data.year > 3)) {
      throw new Error('Year must be between 1 and 3.');
    }

    const updatedStudent = this.studentRepository.update(studentNumber, data);
    if (!updatedStudent) {
      throw new Error(`Student with number '${studentNumber}' not found.`);
    }

    return updatedStudent;
  }

  public deleteStudent(studentNumber: string): void {
    const isDeleted = this.studentRepository.delete(studentNumber);
    if (!isDeleted) {
      throw new Error(`Student with number '${studentNumber}' not found.`);
    }
  }
}
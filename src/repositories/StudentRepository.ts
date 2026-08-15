import { Student } from '../models/StudentModel';

export class StudentRepository {
  private students: Student[] = [
    {
      studentId: 'STD001',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '2004-05-15',
      year: 1
    },
    {
      studentId: 'STD002',
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '2003-10-20',
      year: 2
    }
  ];

  public findAll(): Student[] {
    return this.students;
  }

  public findByStudentId(studentId: string): Student | undefined {
    return this.students.find((s) => s.studentId === studentId);
  }

  public create(studentData: Student): Student {
    this.students.push(studentData);
    return studentData;
  }

  public update(studentId: string, updatedData: Partial<Student>): Student | null {
    const index = this.students.findIndex((s) => s.studentId === studentId);
    if (index === -1) return null;

    this.students[index] = { ...this.students[index], ...updatedData };
    return this.students[index];
  }

  public delete(studentId: string): boolean {
    const initialLength = this.students.length;
    this.students = this.students.filter((s) => s.studentId !== studentId);
    return this.students.length < initialLength;
  }
}
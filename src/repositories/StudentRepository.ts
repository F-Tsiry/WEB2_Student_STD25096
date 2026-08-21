import { pool } from '../configuration/database';
import { Student } from '../models/StudentModel';

export default class StudentRepository {
  private mapRowToStudent(row: any): Student {
    return {
      studentId: row.student_id,
      firstName: row.first_name,
      lastName: row.last_name,
      birthDate: row.birth_date,
      year: row.year,
    };
  }

  public async findAll(): Promise<Student[]> {
    const result = await pool.query('SELECT * FROM student;');
    return result.rows.map(this.mapRowToStudent);
  }

  public async findByID(id: string): Promise<Student | null> {
    const result = await pool.query('SELECT * FROM student WHERE student_id = $1;', [id]);
    return result.rows[0] ? this.mapRowToStudent(result.rows[0]) : null;
  }

  public async getLastStudentId(): Promise<number> {
    const query = `
      SELECT student_id 
      FROM student 
      WHERE student_id LIKE 'STD%' 
      ORDER BY student_id DESC 
      LIMIT 1;
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) return 0;

    const lastIdStr: string = result.rows[0].student_id;
    const numericPart = lastIdStr.replace('STD', '');
    return parseInt(numericPart, 10);
  }

  public async create(student: Student): Promise<Student> {
    const query = `
      INSERT INTO student (student_id, first_name, last_name, birth_date, year) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    const values = [student.studentId, student.firstName, student.lastName, student.birthDate, student.year];
    const result = await pool.query(query, values);
    return this.mapRowToStudent(result.rows[0]);
  }

  public async update(studentId: string, data: Partial<Student>): Promise<Student | null> {
    const query = `
      UPDATE student 
      SET first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          birth_date = COALESCE($3, birth_date), 
          year = COALESCE($4, year)
      WHERE student_id = $5
      RETURNING *;
    `;
    const values = [data.firstName, data.lastName, data.birthDate, data.year, studentId];
    const result = await pool.query(query, values);
    return result.rows[0] ? this.mapRowToStudent(result.rows[0]) : null;
  }

  public async delete(studentId: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM student WHERE student_id = $1;', [studentId]);
    return (result.rowCount ?? 0) > 0;
  }
}
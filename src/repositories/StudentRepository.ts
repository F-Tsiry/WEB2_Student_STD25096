import { pool } from '../db/Connection';
import { Student } from "../models/StudentModel";

export default class StudentRepository {

    public async findAll (): Promise<Student[]> {
        try {
            const results = await pool.query("select * from student;");
            return results.rows;
        } catch (error) {
            throw new Error("SQL error");
        }
    }

    public async findByID(id: String): Promise<Student> {
        try {
            const result =  await pool.query("select * from student WHERE student_id = $1", [id])
            return result.rows[0];
        } catch (error: any) {
            throw new Error("SQL error");
        }
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

    if (result.rows.length === 0) {
      return 0;
    }

    const lastIdStr: string = result.rows[0].student_id; 
    const numericPart = lastIdStr.replace('STD', '');
    
    return parseInt(numericPart, 10);
  }

    public async create(student: Student): Promise<Student> {
        try {
            const query = "INSERT INTO student (student_id, first_name, last_name, birth_date, year) VALUES ($1, $2, $3, $4, $5)";
            const values = [student.studentId, student.firstName, student.lastName, student.birthDate, student.year];
            await pool.query(query, values);
            const result = await pool.query("select * from student WHERE student_id = $1;", [student.studentId])
            return result.rows[0];
        } catch (error) {
            throw new Error("SQL error");
        }
    }
}


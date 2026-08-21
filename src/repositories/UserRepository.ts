import { pool } from '../configuration/database';
import { User, Role } from '../models/User';

export class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role as Role,
    };
  }

  public async create(email: string, passwordHash: string, role: Role = 'STUDENT'): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *;',
      [email, passwordHash, role]
    );
    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role as Role,
    };
  }
}
import { pool } from './Connection';

async function runMigration() {
  try {
    console.log('Création de la table student...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student (
        student_number VARCHAR(10) PRIMARY KEY UNIQUE,
        first_name VARCHAR(2000),
        last_name VARCHAR(2000),
        birth_date DATE,
        year SMALLINT CHECK (year BETWEEN 1 AND 3)
      );
    `);
    console.log(' Migration réussie !');
  } catch (error) {
    console.error(' Erreur de migration :', error);
  } finally {
    await pool.end();
  }
}

runMigration();
import { pool } from '../configuration/Connection';
import fs from  'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const runMigration = async () => {
  try {
    console.log('Migration in progress...');
    const migrationsDir = path.join(__dirname, '../../migrations');
    const files =  fs.readdirSync(migrationsDir).sort();
    
    for (const file of files) {
      if (file.endsWith('.sql')) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log('Migration executed successfully : ',file);
      }
    }
    console.log('All migrations completed successfully!');
    await pool.end();
  } catch (error) {
    console.error('Migration failed ! Error :', error);
    process.exit(1);
  }
}

runMigration();
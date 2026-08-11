export interface Student {
  studentNumber: string; // primary key
  firstName: string;
  lastName: string;
  birthDate: string;     // ISO format YYYY-MM-DD
  year: number;          // 1, 2, or 3
}
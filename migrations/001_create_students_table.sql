CREATE TABLE student (
    student_number VARCHAR(10) PRIMARY KEY,
    first_name VARCHAR(2000) NOT NULL,
    last_name VARCHAR(2000) NOT NULL,
    birth_date DATE,
    year SMALLINT CHECK (year BETWEEN 1 AND 3)
);
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// MYSQL CONNECTION

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to Aiven MySQL');
    }
});

// HOME PAGE

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// GET ALL STUDENTS

app.get('/students', (req, res) => {

    const sql = 'SELECT * FROM students';

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// ADD STUDENT

app.post('/add-student', (req, res) => {

    const {
        student_id,
        full_name,
        course,
        year_level,
        email
    } = req.body;

    const sql = `
        INSERT INTO students
        (student_id, full_name, course, year_level, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [student_id, full_name, course, year_level, email],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Student Added');
            }
        }
    );
});

// GET SINGLE STUDENT

app.get('/student/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM students WHERE id=?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(result[0]);
        }
    });
});

// UPDATE STUDENT

app.put('/update-student/:id', (req, res) => {

    const id = req.params.id;

    const {
        student_id,
        full_name,
        course,
        year_level,
        email
    } = req.body;

    const sql = `
        UPDATE students
        SET student_id=?,
            full_name=?,
            course=?,
            year_level=?,
            email=?
        WHERE id=?
    `;

    db.query(
        sql,
        [student_id, full_name, course, year_level, email, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Student Updated');
            }
        }
    );
});

// DELETE STUDENT

app.delete('/delete-student/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM students WHERE id=?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Student Deleted');
        }
    });
});

// SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

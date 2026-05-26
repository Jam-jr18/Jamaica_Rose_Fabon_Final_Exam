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

// CONNECT DATABASE

db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Connected to Aiven MySQL Database');
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
            res.status(500).send('Error fetching students');
        } else {
            res.json(result);
        }
    });
});

// ADD STUDENT

});

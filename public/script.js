app.post('/add-student', (req, res) => {

    console.log(req.body);

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
        [
            student_id,
            full_name,
            course,
            year_level,
            email
        ],
        (err, result) => {

            if (err) {

                console.log('MYSQL ERROR');
                console.log(err);

                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: 'Student Added Successfully'
            });
        }
    );
});

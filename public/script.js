const form = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');

// LOAD STUDENTS

async function loadStudents() {

    const response = await fetch('/students');
    const students = await response.json();

    studentTable.innerHTML = '';

    students.forEach(student => {

        studentTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.student_id}</td>
                <td>${student.full_name}</td>
                <td>${student.course}</td>
                <td>${student.year_level}</td>
                <td>${student.email}</td>

                <td>
                    <button onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// LOAD ON START

loadStudents();

// ADD STUDENT

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const student = {
        student_id: document.getElementById('student_id').value,
        full_name: document.getElementById('full_name').value,
        course: document.getElementById('course').value,
        year_level: document.getElementById('year_level').value,
        email: document.getElementById('email').value
    };

    const response = await fetch('/add-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });

    const result = await response.text();

    alert(result);

    // CLEAR FORM

    form.reset();

    // RELOAD TABLE

    loadStudents();
});

// DELETE STUDENT

async function deleteStudent(id) {

    await fetch(`/delete-student/${id}`, {
        method: 'DELETE'
    });

    alert('Student Deleted');

    loadStudents();
}

// EDIT STUDENT

async function editStudent(id) {

    const response = await fetch(`/student/${id}`);

    const student = await response.json();

    const newStudentID = prompt(
        'Student ID',
        student.student_id
    );

    const newName = prompt(
        'Full Name',
        student.full_name
    );

    const newCourse = prompt(
        'Course',
        student.course
    );

    const newYear = prompt(
        'Year Level',
        student.year_level
    );

    const newEmail = prompt(
        'Email',
        student.email
    );

    await fetch(`/update-student/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            student_id: newStudentID,
            full_name: newName,
            course: newCourse,
            year_level: newYear,
            email: newEmail
        })
    });

    alert('Student Updated');

    loadStudents();
}

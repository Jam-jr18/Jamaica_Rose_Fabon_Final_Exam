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

// LOAD TABLE

loadStudents();

// ADD STUDENT

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const student = {

        student_id:
            document.getElementById('student_id').value,

        full_name:
            document.getElementById('full_name').value,

        course:
            document.getElementById('course').value,

        year_level:
            document.getElementById('year_level').value,

        email:
            document.getElementById('email').value
    };

    const response = await fetch('/add-student', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(student)
    });

    const data = await response.json();

    if (data.success) {

        alert('Student Added Successfully');

        form.reset();

        loadStudents();

    } else {

        alert('Failed to Add Student');
    }
});

// DELETE

async function deleteStudent(id) {

    await fetch(`/delete-student/${id}`, {
        method: 'DELETE'
    });

    loadStudents();
}

// EDIT

async function editStudent(id) {

    const response = await fetch(`/student/${id}`);

    const student = await response.json();

    const student_id =
        prompt('Student ID', student.student_id);

    const full_name =
        prompt('Full Name', student.full_name);

    const course =
        prompt('Course', student.course);

    const year_level =
        prompt('Year Level', student.year_level);

    const email =
        prompt('Email', student.email);

    await fetch(`/update-student/${id}`, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            student_id,
            full_name,
            course,
            year_level,
            email
        })
    });

    loadStudents();
}

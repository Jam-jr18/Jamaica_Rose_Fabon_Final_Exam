const form = document.getElementById('studentForm');
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

    await fetch('/add-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });

    alert('Student Added Successfully');

    form.reset();
    loadStudents();
});

// DELETE STUDENT

async function deleteStudent(id) {
    if (confirm('Delete this student?')) {
        await fetch(`/delete-student/${id}`, {
            method: 'DELETE'
        });

        alert('Student Deleted');
        loadStudents();
    }
}

// EDIT STUDENT

async function editStudent(id) {
    const response = await fetch(`/student/${id}`);
    const student = await response.json();

    const newStudentID = prompt('Student ID', student.student_id);
    const newName = prompt('Full Name', student.full_name);
    const newCourse = prompt('Course', student.course);
    const newYear = prompt('Year Level', student.year_level);
    const newEmail = prompt('Email', student.email);

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

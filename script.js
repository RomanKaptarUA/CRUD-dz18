const API_URL = 'http://localhost:3000/students';

document.getElementById('get-students-btn').addEventListener('click', getStudents);
document.getElementById('add-student-form').addEventListener('submit', addStudent);

// показуємо всіх студентів
async function getStudents() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    renderStudents(data.students)
}

function renderStudents(students) {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = ''

    // перебираємо студентів 
    students.forEach(student => {
    //   додає рядок 
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
        `;

        // тіло таблиці приймає рядок
        tbody.appendChild(row);
    })
}

async function addStudent(e) {
    e.preventDefault()
    const student = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value),
        course: document.getElementById('course').value,
        skills: document.getElementById('skills').value.split(', ').map(s => s.trim()),
        email: document.getElementById('email').value,
        isEnrolled: document.getElementById('isEnrolled').checked
    }
    await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    getStudents();
    e.target.reset(); 
}

async function updateStudent(id) {
    const newName = prompt('Введіть нове імя');
    if(!newName) return;

    await fetch(`${API_URL}/students/${id}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: newName}),
        });
        getStudents();
}

async function deleteStudent(id) {
     if (!confirm('Ви впевнені що хочете видалити студента?')) return;
     
     await fetch(`${API_URL}/students/${id}`, {
           method: 'DELETE'
     })
    getStudents();
    }
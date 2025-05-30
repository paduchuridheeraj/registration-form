const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#entriesTable tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked ? 'yes' : 'no';

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${password}</td>
    <td>${dob}</td>
    <td>${terms}</td>
  `;

  tableBody.appendChild(newRow);
  form.reset();
});

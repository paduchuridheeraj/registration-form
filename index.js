const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntries() {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function saveEntries(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

function showEntries() {
  const entries = getEntries();
  tableBody.innerHTML = "";
  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.accepted ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(row);
  });
}

function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accepted = document.getElementById("acceptTerms").checked;

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = { name, email, password, dob, accepted };
  const entries = getEntries();
  entries.push(newEntry);
  saveEntries(entries);
  showEntries();
  form.reset();
});

document.addEventListener("DOMContentLoaded", showEntries);

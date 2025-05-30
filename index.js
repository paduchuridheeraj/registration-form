const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntries() {
  const entries = localStorage.getItem("entries");
  return entries ? JSON.parse(entries) : [];
}

function saveEntry(entry) {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function showEntries() {
  const entries = getEntries();
  tableBody.innerHTML = "";

  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(row);
  });
}

function isValidDob(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (
    age > 55 ||
    age < 18 ||
    (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))) ||
    (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))
  ) {
    return false;
  }
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!isValidDob(dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const newEntry = {
    name,
    email,
    password,
    dob,
    termsAccepted: acceptTerms
  };

  saveEntry(newEntry);
  showEntries();
  form.reset();
});

document.addEventListener("DOMContentLoaded", showEntries);

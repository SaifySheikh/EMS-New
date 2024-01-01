let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function getCurrentDate() {
  const now = new Date();
  const options = { day: 'numeric', month: 'short' };
  return now.toLocaleDateString('en-US', options);
}

document.getElementById('currentDate').innerText = getCurrentDate();

// ... (existing code)
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from server
    fetch('http://localhost:3000/admin_to_recruiter-details')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      
      .then(data => {
        console.log(data); // Add this line
        updateTable(data);
      })
      
      .catch(error => console.error(error));
  });
  
  function updateTable(data) {
    const tableBody = document.querySelector('tbody');
  
    // Clear existing rows
    tableBody.innerHTML = '';
  
    // Loop through the data and append rows to the table
    data.forEach(candidate => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${candidate.name}</td>
        <td>${candidate.mobile}</td>
        <td>${candidate.location}</td>
        <td>${candidate.jobInterest}</td>
        <td>${candidate.status}</td>
        <td>${candidate.joined}</td>
        <td><input type="checkbox" name="active" id="active"></td>
      `;
      tableBody.appendChild(newRow);
    });
  }
  
/* ===== USER DATA ==== */
    const users = [];

     /* ===== ADD USER ==== */
    function addUser() {

       /* ===== INPUTS ==== */
      const idNumber = document.getElementById('idNumber').value;
      const firstName = document.getElementById('firstName').value;
      const middleName = document.getElementById('middleName').value;
      const lastName = document.getElementById('lastName').value;
      const gender = document.getElementById('gender').value;
      const birthday = document.getElementById('birthday').value;

       /* ===== VALIDITY OF INPUTS ==== */
      if (!idNumber || !firstName || !lastName || !gender || !birthday) {
        alert("Please fill out all required fields!");
        return;
      }

     /* ===== USER ==== */
        const user = { idNumber, firstName, middleName, lastName, gender, birthday };
  users.push(user);
  displayUsers();
  document.getElementById('signupForm').reset();

       /* ===== RESET TABLE ==== */
      document.getElementById('signupForm').reset();
    }

/* ===== SHOW BUTTON ==== */
     document.getElementById('nextPageContainer').style.display = 'block';

     /* ===== DISPALY USER LOGS ==== */
    function displayUsers() {
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = '';

      users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.idNumber}</td>
          <td>${user.firstName}</td>
          <td>${user.middleName}</td>
          <td>${user.lastName}</td>
          <td>${user.gender}</td>
          <td>${user.birthday}</td>
        `;
        tableBody.appendChild(row);
      });
    }

     /* ===== DOM EVENT ==== */
    document.getElementById('saveBtn').addEventListener('click', addUser);

    /* ===== REDIRECT TO INDEX ==== */
 document.getElementById('nextPageBtn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    
     /* ===== BACKGROUND ==== */
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        document.body.style.backgroundColor = '#e4b6b6'; 
      });
      input.addEventListener('blur', () => {
        document.body.style.backgroundColor = '#f5f5f5';
      });
    });
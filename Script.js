const $ = id => document.getElementById(id);
const tabLogin = $('tabLogin');
const tabSignup = $('tabSignup');
const loginForm = $('loginForm');
const signupForm = $('signupForm');
const loginMsg = $('loginMsg');
const signupMsg = $('signupMsg');

function showLogin() {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  loginMsg.textContent = '';
  signupMsg.textContent = '';
}

function showSignup() {
  tabLogin.classList.remove('active');
  tabSignup.classList.add('active');
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  loginMsg.textContent = '';
  signupMsg.textContent = '';
}

tabLogin.addEventListener('click', showLogin);
tabSignup.addEventListener('click', showSignup);

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('artevo_users') || '{}');
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem('artevo_users', JSON.stringify(users));
}

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const first = $('su-first').value.trim();
  const last = $('su-last').value.trim();
  const iden = $('su-identifier').value.trim().toLowerCase();
  const pwd = $('su-password').value;
  if (!iden || !pwd || !first || !last) {
    signupMsg.textContent = 'Please fill required fields.';
    return;
  }
  const users = loadUsers();
  if (users[iden]) {
    signupMsg.textContent = 'Account already exists.';
    return;
  }
  users[iden] = { first, last, id: iden, pwd };
  saveUsers(users);
  signupMsg.style.color = 'green';
  signupMsg.textContent = 'Account created! You can now log in.';
  setTimeout(() => {
    showLogin();
    signupMsg.style.color = '';
    signupForm.reset();
  }, 900);
});

$('cancelSignup').addEventListener('click', () => {
  showLogin();
  signupForm.reset();
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const iden = $('li-identifier').value.trim().toLowerCase();
  const pwd = $('li-password').value;
  const users = loadUsers();
  const user = users[iden];
  if (!user || user.pwd !== pwd) {
    loginMsg.style.color = 'var(--danger)';
    loginMsg.textContent = 'Invalid credentials.';
    return;
  }
  loginMsg.style.color = 'green';
  loginMsg.textContent = `Welcome back, ${user.first}!`;
  localStorage.setItem('artevo_current', iden);
});

$('demoBtn').addEventListener('click', () => {
  const users = loadUsers();
  if (!users['demo@artevo.test']) {
    users['demo@artevo.test'] = {
      first: 'Demo',
      last: 'User',
      id: 'demo@artevo.test',
      pwd: 'password123'
    };
    saveUsers(users);
  }
  $('li-identifier').value = 'demo@artevo.test';
  $('li-password').value = 'password123';
  loginForm.dispatchEvent(new Event('submit', { cancelable: true }));
});




// ===== AUTHENTICATION SYSTEM =====

// Dummy users database
const dummyUsers = [
    { username: 'admin', password: 'admin123', email: 'admin@algomaster.com' },
    { username: 'student', password: 'student123', email: 'student@algomaster.com' },
    { username: 'guest', password: 'guest123', email: 'guest@algomaster.com' }
];

// Get users from localStorage or use dummy users
function getUsers() {
    const stored = localStorage.getItem('algomaster_users');
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with dummy users
    localStorage.setItem('algomaster_users', JSON.stringify(dummyUsers));
    return dummyUsers;
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('algomaster_users', JSON.stringify(users));
}

// Handle Login
function handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!username || !password) {
        errorEl.textContent = 'Please enter username and password';
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store session
        localStorage.setItem('algomaster_session', JSON.stringify({
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString()
        }));
        
        errorEl.textContent = '';
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        errorEl.textContent = 'Invalid username or password';
    }
}

// Handle Signup
function handleSignup() {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const errorEl = document.getElementById('signup-error');
    const successEl = document.getElementById('signup-success');

    errorEl.textContent = '';
    successEl.textContent = '';

    if (!username || !email || !password) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }

    if (username.length < 3) {
        errorEl.textContent = 'Username must be at least 3 characters';
        return;
    }

    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        return;
    }

    const users = getUsers();
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        errorEl.textContent = 'Username already exists';
        return;
    }

    // Add new user
    users.push({ username, email, password });
    saveUsers(users);

    successEl.textContent = 'Account created successfully! Please login.';
    
    // Clear form
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';

    // Switch to login after 2 seconds
    setTimeout(() => {
        showLogin();
    }, 2000);
}

// Show Login Form
function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-error').textContent = '';
}

// Show Signup Form
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('signup-error').textContent = '';
    document.getElementById('signup-success').textContent = '';
}

// Handle Enter key press
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    document.getElementById('signup-password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSignup();
    });
});

// Check if user is already logged in
function checkAuth() {
    const session = localStorage.getItem('algomaster_session');
    if (session && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

checkAuth();

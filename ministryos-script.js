document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    const loginForm = document.getElementById('ministry-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple authentication (demo/demo)
            if (username === 'demo' && password === 'demo') {
                localStorage.setItem('ministryAuth', 'true');
                window.location.href = 'ministryos-dashboard.html';
            } else {
                alert('Invalid credentials. Use demo/demo to login.');
            }
        });

        // Toggle password visibility
        const togglePassword = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password');
        
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
            });
        }
    }

    // Check authentication on dashboard
    if (window.location.pathname.includes('ministryos-dashboard.html')) {
        const isAuth = localStorage.getItem('ministryAuth');
        if (isAuth !== 'true') {
            window.location.href = 'ministryos-login.html';
        }
    }

    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle section switching
            const href = item.getAttribute('href');
            if (href === '#quick-launch') {
                showSection('quick-launch-section');
            } else if (href === '#dashboard') {
                showSection('analytics-section');
            }
        });
    });

    // Feature card click handlers
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.feature-title').textContent;
            
            if (title === 'Dashboard') {
                showSection('analytics-section');
                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                const dashboardNav = document.querySelector('a[href="#dashboard"]');
                if (dashboardNav) dashboardNav.classList.add('active');
            } else {
                alert(`${title} feature coming soon!`);
            }
        });
    });

    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = `
                <div class="dropdown-item" onclick="alert('Profile coming soon!')">Profile</div>
                <div class="dropdown-item" onclick="alert('Settings coming soon!')">Settings</div>
                <div class="dropdown-item" onclick="logout()">Logout</div>
            `;
            
            // Toggle dropdown
            const existing = document.querySelector('.user-dropdown');
            if (existing) {
                existing.remove();
            } else {
                userMenu.appendChild(dropdown);
                
                // Close dropdown when clicking outside
                setTimeout(() => {
                    document.addEventListener('click', (e) => {
                        if (!userMenu.contains(e.target)) {
                            dropdown.remove();
                        }
                    }, { once: true });
                }, 100);
            }
        });
    }

    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Helper function to show sections
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Initialize with quick launch visible
    if (document.getElementById('quick-launch-section')) {
        showSection('quick-launch-section');
    }
});

// Logout function
function logout() {
    localStorage.removeItem('ministryAuth');
    window.location.href = 'ministryos-login.html';
}

// Add styles for user dropdown dynamically
const style = document.createElement('style');
style.textContent = `
    .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-top: 10px;
        min-width: 150px;
        z-index: 1000;
    }
    
    .dropdown-item {
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.2s;
        font-size: 0.95rem;
    }
    
    .dropdown-item:hover {
        background: #f5f5f5;
    }
    
    .dropdown-item:first-child {
        border-radius: 8px 8px 0 0;
    }
    
    .dropdown-item:last-child {
        border-radius: 0 0 8px 8px;
        color: #D32F2F;
    }
    
    .user-menu {
        position: relative;
    }
    
    @media (max-width: 768px) {
        .sidebar {
            position: fixed;
            left: -280px;
            transition: left 0.3s;
            z-index: 1000;
            height: 100vh;
        }
        
        .sidebar.mobile-open {
            left: 0;
        }
    }
`;
document.head.appendChild(style);

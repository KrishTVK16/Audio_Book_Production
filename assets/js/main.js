document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update all icons initially
    const updateIcons = (theme) => {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            }
        });
    };

    updateIcons(currentTheme);

    // Event Listeners
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    });

    // Dashboard Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 &&
                sidebar.classList.contains('show') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }

    // Dashboard Section Navigation (Single Page Logic)
    const dashboardNavLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-target]');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    if (dashboardNavLinks.length > 0) {
        dashboardNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                dashboardNavLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Hide all sections
                dashboardSections.forEach(section => section.classList.add('d-none'));

                // Show target section
                const targetId = link.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('d-none');
                }

                // Close mobile sidebar after selection
                if (window.innerWidth < 992 && sidebar) {
                    sidebar.classList.remove('show');
                }
            });
        });
    }
});

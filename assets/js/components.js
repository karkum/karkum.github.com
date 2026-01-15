// Navigation Component
function createNavigation(activePage = '') {
    const nav = document.querySelector('header nav');
    if (!nav) return;

    const pages = [
        { name: 'Speaking', path: '/speaking/' },
        { name: 'Writing', path: '/writing/' },
        { name: 'Projects', path: '/projects/' },
        { name: 'Photography', path: '/photos/' }
    ];

    const navHTML = `
        <a href="/" class="logo">Karthik Kumar</a>
        <button class="menu-toggle" aria-label="Toggle menu">☰</button>
        <ul class="nav-links">
            ${pages.map(page => `
                <li><a href="${page.path}" class="${activePage === page.name.toLowerCase() ? 'active' : ''}">${page.name}</a></li>
            `).join('')}
        </ul>
    `;

    nav.innerHTML = navHTML;

    // Mobile menu toggle
    const menuToggle = nav.querySelector('.menu-toggle');
    const navLinks = nav.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Footer Component
function createFooter() {
    // Check if footer already exists
    if (document.querySelector('.site-footer')) return;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="container">
            <p class="built-with">
                Built with <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a>
            </p>
        </div>
    `;

    document.body.appendChild(footer);
}

// Initialize navigation and footer on page load
document.addEventListener('DOMContentLoaded', () => {
    const pageAttr = document.body.getAttribute('data-page');
    createNavigation(pageAttr);
    createFooter();
});

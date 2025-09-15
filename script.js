// Matrix Background
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px 'Roboto Mono'`;
    drops.forEach((y, x) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
    });
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

// Scroll Animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Form Validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Invalid email.');
        return;
    }
    alert('Message sent! (Simulation)');
    form.reset();
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Terminal Console (Bonus)
const terminal = document.getElementById('terminal');
const facts = [
    'Fact: Always update your software to patch vulnerabilities.',
    'Log: Scanning for threats...',
    'Fact: Use multi-factor authentication everywhere.',
    'Log: Firewall active.',
    'Fact: Phishing is the #1 attack vector.'
];
function outputFact() {
    const p = document.createElement('p');
    p.textContent = facts[Math.floor(Math.random() * facts.length)];
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}
setInterval(outputFact, 5000);
terminal.style.display = 'block';

// Portfolio Filters
const filterBtns = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        projects.forEach(proj => {
            if (filter === 'all' || proj.dataset.category === filter) {
                proj.style.display = 'block';
            } else {
                proj.style.display = 'none';
            }
        });
    });
});

// Theme Toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Remember last section (Bonus)
const lastSection = localStorage.getItem('lastSection');
if (lastSection) {
    document.querySelector(lastSection).scrollIntoView({ behavior: 'smooth' });
}
window.addEventListener('beforeunload', () => {
    const currentSection = '#' + document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('section').id;
    localStorage.setItem('lastSection', currentSection);
});

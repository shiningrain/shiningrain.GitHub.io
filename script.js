// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Profile image toggle effect (similar to reference site)
const profileImg = document.getElementById('profileImg');
let imageState = 0;

if (profileImg) {
    profileImg.addEventListener('click', function() {
        imageState = (imageState + 1) % 2;
        if (imageState === 1) {
            this.style.filter = 'grayscale(100%)';
        } else {
            this.style.filter = 'grayscale(0%)';
        }
    });
}

// Highlight current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add fade-in effect on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.publication, .education-item, .news-item').forEach(el => {
    observer.observe(el);
});

// Add hover effect to publication links
document.querySelectorAll('.pub-content h3 a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add active state styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--link-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Back to top button (appears when scrolling down)
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--link-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'scale(1)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'scale(0.8)';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'var(--link-hover)';
    this.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'var(--link-color)';
    this.style.transform = 'scale(1)';
});

// Add loading animation for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});

// Secret button and modal logic
const secretBtn = document.getElementById('secretBtn');
const secretModal = document.getElementById('secretModal');
const imageModal = document.getElementById('imageModal');
const closeBtn = document.querySelector('.close');
const closeImageBtn = document.querySelector('.close-image');
const submitBtn = document.getElementById('submitAnswer');
const answerInput = document.getElementById('secretAnswer');
const errorMsg = document.getElementById('errorMsg');

// Open secret modal when button is clicked
if (secretBtn) {
    secretBtn.addEventListener('click', function() {
        secretModal.style.display = 'block';
        answerInput.value = '';
        errorMsg.textContent = '';
    });
}

// Close modals
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        secretModal.style.display = 'none';
    });
}

if (closeImageBtn) {
    closeImageBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });
}

// Click outside to close
window.addEventListener('click', function(event) {
    if (event.target === secretModal) {
        secretModal.style.display = 'none';
    }
    if (event.target === imageModal) {
        imageModal.style.display = 'none';
    }
});

// Submit answer
if (submitBtn) {
    submitBtn.addEventListener('click', checkAnswer);
}

// Allow Enter key to submit
if (answerInput) {
    answerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
}

function checkAnswer() {
    const answer = answerInput.value.trim().toLowerCase();
    if (answer === 'miku') {
        secretModal.style.display = 'none';
        imageModal.style.display = 'block';
        errorMsg.textContent = '';
        loadLeaderboard();
    } else {
        errorMsg.textContent = 'Please Try Again 🎤';
        answerInput.value = '';
    }
}

// Leaderboard functionality
const submitNameBtn = document.getElementById('submitName');
const userNameInput = document.getElementById('userName');
const leaderboardList = document.getElementById('leaderboardList');

// Load leaderboard from localStorage
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('easterEggLeaderboard') || '[]');
    displayLeaderboard(leaderboard);
}

// Display leaderboard
function displayLeaderboard(leaderboard) {
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<p class="no-entries">Be the first to leave your mark!</p>';
        return;
    }

    leaderboardList.innerHTML = leaderboard.map((entry, index) => `
        <div class="leaderboard-entry">
            <span class="rank">#${index + 1}</span>
            <span class="name">${escapeHtml(entry.name)}</span>
            <span class="date">${entry.date}</span>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Submit name to leaderboard
if (submitNameBtn) {
    submitNameBtn.addEventListener('click', function() {
        const name = userNameInput.value.trim();
        if (name.length === 0) {
            alert('Please enter your name!');
            return;
        }

        // Get current leaderboard
        const leaderboard = JSON.parse(localStorage.getItem('easterEggLeaderboard') || '[]');

        // Check if name already exists
        if (leaderboard.some(entry => entry.name.toLowerCase() === name.toLowerCase())) {
            alert('This name is already on the leaderboard!');
            return;
        }

        // Add new entry
        const newEntry = {
            name: name,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        leaderboard.unshift(newEntry); // Add to beginning

        // Save to localStorage
        localStorage.setItem('easterEggLeaderboard', JSON.stringify(leaderboard));

        // Clear input and reload leaderboard
        userNameInput.value = '';
        displayLeaderboard(leaderboard);

        // Show success message
        alert('🎉 Your name has been added to the Hall of Fame!');
    });
}

// Allow Enter key to submit name
if (userNameInput) {
    userNameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitNameBtn.click();
        }
    });
}

console.log('Personal homepage loaded successfully!');

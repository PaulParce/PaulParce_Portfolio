const themeBtn = document.getElementById('themeBtn');
const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelectorAll('.navbar a');
const footer = document.querySelector('footer');
const quoteGenerator = document.getElementById('quoteGenerator');
const toggleSkillsBtn = document.getElementById('toggleSkillsBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.documentElement.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = '☀︎';
    themeBtn.style.backgroundColor = '#444'; 
    navbar.style.backgroundColor = '#222';
    navbar.style.color = '#ddd';
    navbarLinks.forEach(link => {
      link.style.color = '#ddd';
    });
    footer.style.backgroundColor = '#222';
    footer.style.color = '#ddd';
    if (quoteGenerator) {
      quoteGenerator.style.backgroundColor = '#797aaa';
    }
    if (toggleSkillsBtn) {
      toggleSkillsBtn.style.backgroundColor = '#797aaa';
    }
   
  } else {
    themeBtn.textContent = '🌙';
    themeBtn.style.backgroundColor = ''; 
    navbar.style.backgroundColor = ''; 
    navbarLinks.forEach(link => {
      link.style.color = '';
    });
    footer.style.backgroundColor = '';
    if (quoteGenerator) {
      quoteGenerator.style.backgroundColor = '';
    }
    if (toggleSkillsBtn) {
      toggleSkillsBtn.style.backgroundColor = '';
    }
  }
});

// Hover effects based on theme
themeBtn.addEventListener('mouseenter', () => {
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.style.backgroundColor = '#53202e';
  } else {
    themeBtn.style.backgroundColor = '#222';
  }
});

themeBtn.addEventListener('mouseleave', () => {
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.style.backgroundColor = '#444';
  } else {
    themeBtn.style.backgroundColor = '#7f2a45';
  }
});


// Edit Job Title Functionality
promptJobTitle = () => {
  const jobTitleElement = document.querySelector('.job-title');
  const newJobTitle = prompt('Enter your new job title:', jobTitleElement.textContent);
  if (newJobTitle !== null && newJobTitle.trim() !== '') {
    jobTitleElement.textContent = newJobTitle.trim();
  }
};

const editJobBtn = document.getElementById('editJobBtn');
editJobBtn.addEventListener('click', promptJobTitle);


// Hide / Show Skills Functionality
const skillsBox = document.querySelector('.skills-box');  

if (toggleSkillsBtn && skillsBox) {
  toggleSkillsBtn.addEventListener('click', () => {
    if (skillsBox.style.display === 'none') {
      skillsBox.style.display = 'block';
      toggleSkillsBtn.textContent = 'Hide Skills';
    } else {
      skillsBox.style.display = 'none';
      toggleSkillsBtn.textContent = 'Show Skills';
    } 
  });
}


// Message Character Counter
const msgBox = document.getElementById('msgBox');
const counter = document.getElementById('counter');
if (msgBox && counter) {
  msgBox.addEventListener('input', () => {
    const maxLength = msgBox.getAttribute('maxlength');
    const currentLength = msgBox.value.length;
    counter.textContent = maxLength - currentLength;
  });
} 


// Form Validation
function validateForm() {
  const nameField = document.getElementById('nameField').value.trim();
  const emailField = document.getElementById('emailField').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (nameField === '') {
    alert('Please enter your name.');
    return false;
  } else if (emailField === '' || !emailPattern.test(emailField)) {
    alert('Please enter a valid email address.');
    return false;
  } else if (msgBox.value.trim() === '') {
    alert('Please enter a message.');
    return false;
  } else {
    alert('Form submitted successfully!');
    return true;
  }
}


// Display Current Date in Footer
const dateDisplay = document.getElementById('dateDisplay');
if (dateDisplay) {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  dateDisplay.textContent = currentDate.toLocaleDateString(undefined, options);
}


// Display Time-Based Greeting in Footer
const timeGreeter = document.getElementById('timeGreeter');
if (timeGreeter) {
  const currentHour = new Date().getHours();
  let greeting = '';
  if (currentHour < 12) {
    greeting = 'Good Morning! 🌤️';
  }
  else if (currentHour < 18) {
    greeting = 'Good Afternoon! 🌄';
  }
  else {
    greeting = 'Good Evening! 🌃';
  }
  timeGreeter.textContent = greeting;
}

// Quote Generator
const quotes = [
  "The best way to predict the future is to invent it. – Alan Kay",
  "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "In the middle of every difficulty lies opportunity. – Albert Einstein"
];
if (quoteGenerator) {
  quoteGenerator.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    alert(quotes[randomIndex]);
  }); 
}

// Carousel functionality
(() => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slidesContainer = carousel.querySelector('.slides');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const indicators = carousel.querySelector('.carousel-indicators');
  let current = 0;
  let autoplayInterval = null;

  // build indicators
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Show slide ${i+1}`);
    btn.addEventListener('click', () => goTo(i));
    indicators.appendChild(btn);
  });

  const indicatorButtons = Array.from(indicators.querySelectorAll('button'));

  function update() {
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    indicatorButtons.forEach((b, i) => b.classList.toggle('active', i === current));
  }

  function prev() { current = (current - 1 + slides.length) % slides.length; update(); }
  function next() { current = (current + 1) % slides.length; update(); }
  function goTo(i) { current = i % slides.length; update(); }

  // attach buttons
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // autoplay
  function startAutoplay() { autoplayInterval = setInterval(next, 4500); }
  function stopAutoplay() { if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; } }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // init
  update();
  startAutoplay();
})();


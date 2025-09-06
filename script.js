    // Clock
    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      document.getElementById('clock').textContent = time;
      document.getElementById('day').textContent = day;
    }
    setInterval(updateClock, 1000); updateClock();

    // Dark mode
    const toggleBtn = document.getElementById('modeToggle');
    const body = document.body;
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') { body.classList.add('dark'); toggleBtn.textContent = '🌜'; }
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      toggleBtn.textContent = isDark ? '🌜' : '🌞';
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });

    // Mobile nav
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open'); hamburger.classList.remove('active'); hamburger.setAttribute('aria-expanded', 'false');
        navLinks.forEach(l => l.classList.remove('active')); link.classList.add('active');
      });
    });
    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY + 90;
      navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          navLinks.forEach(l => l.classList.remove('active')); link.classList.add('active');
        }
      });
    });

    // Typing effect (roles)
    const roles = ["MERN Stack Developer", "Front-end Developer", "Back-end Developer"];
    const roleEl = document.getElementById('typeRole');
    const caret = document.getElementById('caret');
    let r = 0, i = 0, deleting = false;
    function typeLoop() {
      const current = roles[r];
      if (!deleting) {
        roleEl.textContent = current.slice(0, i + 1);
        i++;
        if (i === current.length) { deleting = true; setTimeout(typeLoop, 1100); return; }
      } else {
        roleEl.textContent = current.slice(0, i - 1);
        i--;
        if (i === 0) { deleting = false; r = (r + 1) % roles.length; }
      }
      setTimeout(typeLoop, deleting ? 45 : 85);
    }
    typeLoop();
    // caret blink
    setInterval(() => { caret.style.opacity = caret.style.opacity === '0' ? '1' : '0'; }, 420);

    // Career tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
        const id = btn.dataset.tab;
        document.getElementById(id).classList.add('active');
      });
    });

    // Project filters
    
const projectsContainer = document.getElementById("projectsContainer");
const projects = Array.from(projectsContainer.querySelectorAll(".project-card"));
const nextBtn = document.querySelector(".pagination-arrows .next");
const prevBtn = document.querySelector(".pagination-arrows .prev");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentPage = 1;
const projectsPerPage = 6;
let currentFilter = "all";

// Function to display projects
function displayProjects() {
  const filtered = currentFilter === "all" ? projects : projects.filter(p => p.dataset.category === currentFilter);

  projects.forEach(p => p.style.display = "none"); // hide all

  const start = (currentPage - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  const pageProjects = filtered.slice(start, end);

  pageProjects.forEach(p => p.style.display = "block");

  // Enable/disable buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= filtered.length;
}

// Pagination button events
nextBtn.addEventListener("click", () => {
  currentPage++;
  displayProjects();
});

prevBtn.addEventListener("click", () => {
  currentPage--;
  displayProjects();
});

// Filter buttons events
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    currentPage = 1; // reset page
    displayProjects();
  });
});

// Initial display
displayProjects();


    // Contact form validation (inline errors)
    const contactForm = document.getElementById('contactForm');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const msgErr = document.getElementById('msgErr');
    const formOk = document.getElementById('formOk');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      nameErr.textContent = emailErr.textContent = msgErr.textContent = "";
      formOk.style.display = "none";

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      let ok = true;

      if (!name) { nameErr.textContent = "Please enter your name."; ok = false; }
      if (!email) { emailErr.textContent = "Please enter your email."; ok = false; }
      else if (!validateEmail(email)) { emailErr.textContent = "Please enter a valid email address."; ok = false; }
      if (!message) { msgErr.textContent = "Please enter your message."; ok = false; }

      if (!ok) return;

      // Simulate success (integrate EmailJS or backend here)
      formOk.style.display = "block";
      contactForm.reset();
    });

// Show loader for 3 seconds, then hide
document.body.style.overflow = "hidden";

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("page-content");

  setTimeout(() => {
    preloader.classList.add("hidden");

    setTimeout(() => {
      preloader.style.display = "none";
      content.style.display = "block";
      document.body.style.overflow = "auto";
    }, 800);
  }, 3000); // Loader shows for 3s minimum
});


// Animate elements on scroll
// Animate sections
const animateSections = document.querySelectorAll('.animate');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animateSections.forEach(section => sectionObserver.observe(section));

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => cardObserver.observe(card));

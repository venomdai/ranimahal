const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your request has been submitted. We will contact you shortly.');
    form.reset();
  });
}

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
  const maxImages = 20;
  const galleryFolder = 'assets/images/upload/';
  for (let i = 1; i <= maxImages; i += 1) {
    const img = document.createElement('img');
    img.src = `${galleryFolder}${i}.jpg`;
    img.alt = `Concrete project ${i}`;
    img.loading = 'lazy';
    img.onerror = () => {
      img.remove();
    };
    galleryGrid.appendChild(img);
  }
}

const dateTimeDisplay = document.getElementById('datetime-display');
if (dateTimeDisplay) {
  const formatDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    dateTimeDisplay.textContent = now.toLocaleString('en-US', options);
  };
  formatDateTime();
  setInterval(formatDateTime, 1000);
}

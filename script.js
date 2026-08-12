const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle && nav) {
  const setMenuState = (isOpen) => {
    nav.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('active');
    setMenuState(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.namedItem('name')?.value.trim() || '';
    const email = form.elements.namedItem('email')?.value.trim() || '';

    if (!name || !email) {
      if (status) {
        status.textContent = 'Please enter your name and email so we can contact you.';
        status.classList.add('error');
      }
      return;
    }

    if (status) {
      status.classList.remove('error');
      status.textContent = 'Thank you! Your message has been received. We will contact you shortly.';
    }

    form.reset();
  });
}

const galleryStorageKey = 'rani-mahal-uploaded-gallery';

const defaultGalleryItems = [
  { src: 'assets/images/upload/1.jpg', alt: 'Concrete project view 1', label: 'Concrete block work' },
  { src: 'assets/images/upload/2.jpg', alt: 'Concrete project view 2', label: 'Tile and surface finish' },
  { src: 'assets/images/upload/3.jpg', alt: 'Concrete project view 3', label: 'Project installation detail' },
  { src: 'assets/images/upload/4.jpg', alt: 'Concrete project view 4', label: 'Local concrete products' },
];

const getUploadedGallery = () => {
  try {
    const raw = localStorage.getItem(galleryStorageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveUploadedGallery = (items) => {
  localStorage.setItem(galleryStorageKey, JSON.stringify(items));
};

const renderGallery = () => {
  const galleryGrid = document.querySelector('[data-gallery]');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = '';

  const items = [...defaultGalleryItems, ...getUploadedGallery()];

  items.forEach((item) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';

    const caption = document.createElement('figcaption');
    caption.textContent = item.label;

    img.onerror = () => {
      figure.remove();
    };

    figure.append(img, caption);
    galleryGrid.appendChild(figure);
  });
};

const uploadInput = document.getElementById('gallery-upload');
if (uploadInput) {
  uploadInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    Promise.all(
      files.map((file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
          src: String(reader.result),
          alt: file.name,
          label: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '),
        });
        reader.readAsDataURL(file);
      }))
    ).then((uploaded) => {
      const existing = getUploadedGallery();
      const merged = [...existing, ...uploaded];
      saveUploadedGallery(merged);
      renderGallery();
      uploadInput.value = '';
    });
  });
}

const clearGalleryButton = document.getElementById('clear-gallery');
if (clearGalleryButton) {
  clearGalleryButton.addEventListener('click', () => {
    localStorage.removeItem(galleryStorageKey);
    renderGallery();
  });
}

renderGallery();

const currentYear = document.querySelector('[data-year]');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

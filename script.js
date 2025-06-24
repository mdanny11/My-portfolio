// Initialize variables
const toggle = document.getElementById('modeToggle');
const body = document.body;
const label = document.getElementById('modeLabel');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const socialLinks = document.querySelectorAll('.social-link');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Add animation class after a short delay
setTimeout(() => {
  socialLinks.forEach(link => link.classList.add('visible'));
}, 300);

// Initialize dark mode
const savedTheme = localStorage.getItem('theme');

// Apply saved theme or system preference
if (savedTheme) {
  body.classList.add(savedTheme);
  toggle.checked = savedTheme === 'dark';
  label.textContent = savedTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
} else {
  const prefersDark = mediaQuery.matches;
  if (prefersDark) {
    body.classList.add('dark');
    toggle.checked = true;
    label.textContent = 'Dark Mode';
  } else {
    body.classList.add('light');
  }
}

// Listen for toggle changes
toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  body.classList.toggle('light', !isDark);
  body.classList.toggle('dark', isDark);
  label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Listen for system preference changes
mediaQuery.addEventListener('change', e => {
  const prefersDark = e.matches;
  if (!toggle.checked) {
    body.classList.toggle('dark', prefersDark);
    body.classList.toggle('light', !prefersDark);
    label.textContent = prefersDark ? 'Dark Mode' : 'Light Mode';
  }
});

// Form submission handling
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  formStatus.textContent = 'Sending...';
  formStatus.classList.remove('error', 'success');
  formStatus.classList.add('loading');
  
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      formStatus.textContent = 'Message sent successfully!';
      formStatus.classList.remove('error', 'loading');
      formStatus.classList.add('success');
      form.reset();
    } else {
      formStatus.textContent = 'Failed to send message. Please try again.';
      formStatus.classList.remove('success', 'loading');
      formStatus.classList.add('error');
    }
  } catch (error) {
    formStatus.textContent = 'An error occurred. Please try again.';
    formStatus.classList.remove('success', 'loading');
    formStatus.classList.add('error');
  }
  
  formStatus.style.display = 'block';
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
});

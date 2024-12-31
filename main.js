// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mouse trail effect
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 1000);
});

// Add click sound effect to links
const links = document.querySelectorAll('.link');
// Replace the URL below with your actual audio file URL
const clickSound = new Audio('click-button.mp3'); // Path to the sound file

links.forEach(link => {
  link.addEventListener('click', () => {
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play();
  });
});

// Modal functionality
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Add entrance animation class
  modal.querySelector('.modal-content').classList.add('animate-in');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';

  // Remove animation class
  modal.querySelector('.modal-content').classList.remove('animate-in');
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target.id); // Use closeModal function
  }
};

// Escape key closes modal
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (modal.style.display === 'flex') {
        closeModal(modal.id);
      }
    });
  }
});

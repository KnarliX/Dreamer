// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validate reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    showAlert('Please complete the reCAPTCHA verification.', true);
    return;
  }

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="loading"></div>Sending...';

  // Collect form data
  const name = document.getElementById('name').value.trim();
  const discordId = document.getElementById('discordId').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Check if at least one of Discord ID, Email, or Phone is filled
  if (!discordId && !email && !phone) {
    showAlert('Please fill at least one of the fields: Discord ID, Email, or Phone.', true);
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email)) {
    showAlert('Please enter a valid email address.', true);
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    return;
  }

  const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with your actual Discord webhook URL
  const payload = JSON.stringify({
    content: `Name: ${name}\nDiscord ID: ${discordId || 'N/A'}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\nMessage: ${message}`
  });

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Success
    closeModal('contact');
    showAlert('Your message has been sent successfully!');
    this.reset();
    grecaptcha.reset();
  } catch (error) {
    showAlert('Failed to send message. Please try again.', true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Function to show custom alert
function showAlert(message, isError = false) {
  const alertBox = document.createElement('div');
  alertBox.className = `custom-alert ${isError ? 'error-alert' : ''}`;
  alertBox.innerHTML = `
        <div class="alert-content">
            <span>${message}</span>
            <button class="close-alert" onclick="closeAlert(this)">Close</button>
        </div>
    `;
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.classList.add('show');
  }, 10);
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => alertBox.remove(), 300);
  }, 3000);
}

// Function to close custom alert
function closeAlert(button) {
  const alertBox = button.closest('.custom-alert');
  alertBox.classList.remove('show');
  setTimeout(() => alertBox.remove(), 300);
}

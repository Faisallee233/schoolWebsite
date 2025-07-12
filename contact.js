document.addEventListener('DOMContentLoaded', ()=>{
    

    const icon = document.getElementById('icon');
    const menuBox = document.querySelector('.menu-box');

    icon.addEventListener('mouseenter', () => {
        menuBox.style.display = 'block';
    });
    menuBox.addEventListener('mouseleave', () => {
        menuBox.style.display = 'none';
    });
    
const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;

      const data = {
        names: form.names.value,
        email: form.email.value,
        message: form.message.value,
      };

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const text = await response.text();
        try {
          const result = JSON.parse(text);
          alert(result.message || 'Form submitted successfully!');
        } catch (jsonErr) {
          console.error('Invalid JSON from server:', text);
          alert('Unexpected response from server.');
        }
      } catch (err) {
        alert('Error submitting form: ' + err.message);
      }
    });
  } else {
    console.warn('Contact form not found in DOM');
  }
})
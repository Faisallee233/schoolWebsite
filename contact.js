document.addEventListener("DOMContentLoaded", () => {
  // Toggle menu
  const icon = document.getElementById('icon');
  const menuBox = document.querySelector('.menu-box');

  icon.addEventListener('mouseenter', () => {
      menuBox.style.display = 'block';
  });
  menuBox.addEventListener('mouseleave', () => {
      menuBox.style.display = 'none';
  });

  // Handle contact form submission
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      names: form.elements["names"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", { // <-- Explicit URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.message);
      form.reset();
    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed. Try again.");
    }
  });
});

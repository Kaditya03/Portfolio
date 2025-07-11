document.addEventListener("DOMContentLoaded", () => {
  // Toggle navigation menu on small screens
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link (optional)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scroll-triggered animations
  const animatedElements = document.querySelectorAll(
    ".section, .about-text, .about-photo, .project-card, .skills-category, .education-item, .experience-item, .contact p, #contact-form label, #contact-form input, #contact-form textarea, #contact-form button"
  );
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Contact form validation and feedback
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation (HTML5 validation already present)
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Simulate form submission success
    const submitButton = contactForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
      contactForm.reset();

      // Show success message
      let successMessage = document.createElement("p");
      successMessage.className = "form-success-message";
      successMessage.textContent =
        "Thank you for your message! I will get back to you soon.";
      contactForm.appendChild(successMessage);

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }, 1500);
  });
});

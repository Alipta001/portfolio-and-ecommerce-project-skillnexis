// Responsive navigation menu
document.querySelectorAll(".menu-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const menu = document.getElementById(toggle.getAttribute("aria-controls"));
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = link.closest(".nav-links");
    if (menu) menu.classList.remove("open");
    const toggle = document.querySelector(`[aria-controls="${menu?.id}"]`);
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

// Contact form validation (client-side demonstration; no message is sent)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const fields = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("nameError"),
      validate: value => value.trim().length >= 2,
      message: "Please enter at least 2 characters."
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
      message: "Please enter a valid email address."
    },
    subject: {
      input: document.getElementById("subject"),
      error: document.getElementById("subjectError"),
      validate: value => value.trim().length >= 3,
      message: "Subject must contain at least 3 characters."
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validate: value => value.trim().length >= 10,
      message: "Message must contain at least 10 characters."
    }
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isFormValid = true;

    Object.values(fields).forEach(field => {
      const valid = field.validate(field.input.value);
      field.error.textContent = valid ? "" : field.message;
      field.input.setAttribute("aria-invalid", String(!valid));
      if (!valid) isFormValid = false;
    });

    const feedback = document.getElementById("formFeedback");
    if (isFormValid) {
      feedback.textContent = "All fields are valid. Connect this form to a backend to receive messages.";
      contactForm.reset();
    } else {
      feedback.textContent = "Please correct the highlighted fields and try again.";
    }
  });

  Object.values(fields).forEach(field => {
    field.input.addEventListener("input", () => {
      if (field.validate(field.input.value)) {
        field.error.textContent = "";
        field.input.setAttribute("aria-invalid", "false");
      }
    });
  });
}

// E-commerce demo cart interaction
let cartCount = 0;
const cartCountElement = document.getElementById("cartCount");
const cartFeedback = document.getElementById("cartFeedback");

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    cartCount += 1;
    if (cartCountElement) cartCountElement.textContent = String(cartCount);
    if (cartFeedback) cartFeedback.textContent = `${button.dataset.product} added to your demo bag.`;
    button.textContent = "Added ✓";
    window.setTimeout(() => { button.textContent = "Add to bag +"; }, 1300);
  });
});

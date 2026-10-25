
/* =========================================
   HAFZA JAMALI — PORTFOLIO INTERACTIONS
========================================= */

// 1. Replace this with your real professional email.
const CONTACT_EMAIL = "your-email@example.com";

// 2. Mobile navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 3. Animate sections when they enter the screen.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  // Fallback for older browsers.
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

// 4. Update the copyright year automatically.
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 5. Contact form: prepare an email.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      !CONTACT_EMAIL ||
      CONTACT_EMAIL === "your-email@example.com"
    ) {
      formMessage.textContent =
        "Please add your real email address in script.js first.";

      formMessage.style.color = "#ffadad";
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(
      formData.get("message") || ""
    ).trim();

    const subject = encodeURIComponent(
      `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}`
    );

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${subject}&body=${body}`;

    formMessage.textContent =
      "Your email app should open. Review the message and send it.";

    formMessage.style.color = "#91f1ce";

    window.location.href = mailtoLink;
  });
}

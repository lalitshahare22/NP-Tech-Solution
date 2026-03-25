document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile main menu toggle
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
  }

  // Dropdowns
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  dropdownItems.forEach((item) => {
    const btn = item.querySelector(".menu-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = item.classList.contains("is-open");

      // close others first
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherBtn = other.querySelector(".menu-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Close dropdowns on click outside
  document.addEventListener("click", (e) => {
    dropdownItems.forEach((item) => {
      if (!item.contains(e.target)) {
        item.classList.remove("is-open");
        const btn = item.querySelector(".menu-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });

    // close mobile menu when clicking outside header
    if (
      window.innerWidth <= 900 &&
      primaryNav &&
      navToggle &&
      primaryNav.classList.contains("is-open")
    ) {
      const header = document.querySelector(".site-header");
      if (header && !header.contains(e.target)) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Close menus on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const btn = item.querySelector(".menu-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (primaryNav && navToggle && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Close mobile menu after nav click
  if (primaryNav && navToggle) {
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          primaryNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Placeholder form validation (keep if contact form exists)
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]");
      let hasError = false;

      requiredFields.forEach((field) => {
        const isCheckbox = field.type === "checkbox";
        const isEmpty = isCheckbox ? !field.checked : !field.value.trim();

        if (isEmpty) {
          hasError = true;
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      if (hasError) {
        e.preventDefault();
        alert("Please fill all required fields before submitting.");
      }
    });
  }
});


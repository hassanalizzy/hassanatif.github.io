document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const highlight = document.createElement("div");

  // Create the highlight box
  highlight.classList.add("highlight");
  navbar.appendChild(highlight);

  const sections = document.querySelectorAll("section");

  // Function to move the highlight box
  const moveHighlight = (activeItem) => {
    const { offsetLeft, offsetWidth } = activeItem;
    highlight.style.width = `${offsetWidth}px`;
    highlight.style.left = `${offsetLeft}px`;
  };

  // Set the initial position of the highlight
  const activeItem = document.querySelector(".nav-item.active");
  if (activeItem) {
    moveHighlight(activeItem);
  }

  // Add click event listeners to nav items
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default jump behavior
      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Update active class
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
      moveHighlight(item);
    });
  });

  // Detect the section in view and update the navbar
  const updateActiveNav = () => {
    let currentSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    if (window.scrollY < 100) {
      currentSection = "hero";
    }

    if (currentSection) {
      navItems.forEach((item) => {
        const target = item.getAttribute("href").substring(1);
        if (target === currentSection) {
          navItems.forEach((nav) => nav.classList.remove("active"));
          item.classList.add("active");
          moveHighlight(item);
        }
      });
    }
  };

  // Listen for scroll events to update the active navigation item
  window.addEventListener("scroll", updateActiveNav);

  // Recalculate highlight position on window resize
  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) {
      moveHighlight(activeItem);
    }
  });

  // Add scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  document.body.appendChild(progressBar);

  const updateProgressBar = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  };

  window.addEventListener("scroll", updateProgressBar);

  // Dynamic navbar background
  const updateNavbarBackground = () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.7)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.05)";
    }
  };

  window.addEventListener("scroll", updateNavbarBackground);

  // Typing effect for Hero Section
  const typingText = document.querySelector(".horizontal-text");
  const originalText = "IT"; // Define the text you want to type
  let typingIndex = 0;
  
  const typeEffect = () => {
    if (typingIndex <= originalText.length) {
      typingText.textContent = originalText.substring(0, typingIndex); // Update text dynamically
      typingIndex++;
      setTimeout(typeEffect, 150);
    }
  };
  
  typingText.textContent = ""; // Clear initial text before starting typing effect
  typeEffect();

  // Tilt effect on project cards
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * 10;
      const rotateY = ((x / rect.width) - 0.5) * -10;

      item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "rotateX(0) rotateY(0)";
    });
  });
});

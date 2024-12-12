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
      item.addEventListener("click", () => {
        // Remove active class from all nav items
        navItems.forEach((nav) => nav.classList.remove("active"));
  
        // Add active class to the clicked item
        item.classList.add("active");
  
        // Move the highlight to the clicked item
        moveHighlight(item);
      });
    });
  
    // Detect the section in view and update the navbar
    const updateActiveNav = () => {
      let currentSection = null;
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Adjust offset for better detection
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.getAttribute("id");
        }
      });
  
      // Special case: Handle "Home" when near the top of the page
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
  });
  
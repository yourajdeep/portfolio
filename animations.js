document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CSSRulePlugin);
  
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p");
  const toggleButton = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const menuItems = document.querySelectorAll(".menu-item p");
  const subNav = document.querySelector(".sub-nav");
  let isOpen = false;

  gsap.set(overlay, { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
  });
  
  gsap.set(menuItems, { 
    y: 225
  });
  
  gsap.set(subNav, {
    opacity: 0
  });

  requestAnimationFrame(() => {
    const isMobile = window.innerWidth <= 900;
    
    const timeline = gsap.timeline({ 
      paused: true
    });

    timeline.to(overlay, {
      duration: isMobile ? 1.1 : 1.35,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power3.inOut",
    });

    timeline.to(
      menuItems,
      {
        duration: isMobile ? 1.0 : 1.35,
        y: 0,
        stagger: isMobile ? 0.1 : 0.2,
        ease: "power3.out",
      },
      "-=1"
    );

    timeline.to(
      activeItemIndicator,
      {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        delay: 0.5,
      },
      "<"
    );

    timeline.to(
      subNav,
      {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
      },
      "<"
    );

    toggleButton.addEventListener("click", function () {
      if (isOpen) {
        timeline.reverse();
      } else {
        timeline.timeScale(1).play();
      }
      isOpen = !isOpen;
    });

    document.querySelectorAll(".overlay-menu a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");

        if (isOpen && target !== "#") {
          toggleButton.classList.remove("active");
          
          timeline.timeScale(1.6).reverse();
          isOpen = false;

          setTimeout(() => {
            window.location.href = target;
          }, ((timeline.duration() * 1000) / 1.6) - 300); 
        } else {
          window.location.href = target;
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p");
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;

  gsap.set(".menu-item p", { y: 225 });

  const timeline = gsap.timeline({ paused: true });

  timeline.to(".overlay", {
    duration: 1.35,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power3.inOut",
  });

  timeline.to(
    ".menu-item p",
    {
      duration: 1.35,
      y: 0,
      stagger: 0.2,
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
    ".sub-nav",
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
        
        // Speed up the exit animation (1.6x speed) - Slower/Smoother than 2x
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

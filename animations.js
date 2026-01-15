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

  const initialPhrases = [
    "Hi . নমস্কার . नमस्कार",
    "Ciao . Salut . Hola",
    "こんにちわ . 안녕 . 你好"
  ];

  const greetingWords = [
    "Hi",
    "Ciao",
    "Salut",
    "Hola",
    "নমস্কার",
    "नमस्कार",
    "こんにちわ",
    "안녕",
    "你好"
  ];

  const typewriterElement = document.getElementById("typewriter");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;
  let isInitialPhase = true;
  let currentPhrase = "";

  function generateRandomPhrase() {
    const shuffled = [...greetingWords].sort(() => Math.random() - 0.5);
    return `${shuffled[0]} . ${shuffled[1]} . ${shuffled[2]}`;
  }

  function getNextPhrase() {
    if (isInitialPhase && phraseIndex < initialPhrases.length) {
      return initialPhrases[phraseIndex];
    } else {
      isInitialPhase = false;
      return generateRandomPhrase();
    }
  }

  function typeWriter() {
    if (charIndex === 0 && !isDeleting) {
      currentPhrase = getNextPhrase();
    }
    
    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
      
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        typingSpeed = 800;
      }
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
      
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 3000;
      }
    }
    
    setTimeout(typeWriter, typingSpeed);
  }

  if (typewriterElement) {
    typeWriter();
  }
});

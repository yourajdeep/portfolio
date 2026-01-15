document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;


  anime.set(".menu-item p", { translateY: 225 });
  anime.set(".sub-nav", { bottom: "93%", opacity: 0 });

  const menuTimeline = anime.timeline({
    autoplay: false
  });

  menuTimeline
  .add({
    targets: ".overlay",
    duration: 1350,
    clipPath: ["polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"],
    easing: "easeInOutCubic"
  })
  .add({
    targets: ".menu-item p",
    translateY: [225, 0],
    duration: 1350,
    delay: anime.stagger(200),
    easing: "easeOutCubic"
  }, "-=1000")
  .add({
    targets: ".menu-item p",
    width: ["0%", "100%"],
    duration: 1000,
    easing: "easeOutQuart",
  }, "-=1350")
  .add({
    targets: ".sub-nav",
    bottom: ["93%", "10%"],
    opacity: [0, 1],
    duration: 500,
    easing: "easeOutCubic"
  }, "-=500");

  toggleButton.addEventListener("click", function() {
      if (isOpen) {
           menuTimeline.reverse();
           menuTimeline.play();
           this.classList.remove('active');
      } else {
           if (menuTimeline.reversed) menuTimeline.reverse(); 
           menuTimeline.play();
           this.classList.add('active');
      }
      isOpen = !isOpen;
  });

  document.querySelectorAll(".overlay-menu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");

      if (isOpen && target !== "#") {
        toggleButton.classList.remove("active");
        
        menuTimeline.reverse();
        menuTimeline.play();
        isOpen = false;

        setTimeout(() => {
          window.location.href = target;
        }, menuTimeline.duration - 300); 
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

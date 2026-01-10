const container = document.querySelector(".container");
const content = document.querySelector("section");
const EASE = 0.12;
let skewStrength = 0.05;
let currentScroll = 0;
let targetScroll = 0;
let maxScroll = 0;

function updateDimensions() {
    maxScroll = container.scrollWidth - window.innerWidth;
    
    if (window.innerWidth < 600) {
        skewStrength = 0.07; 
    } else {
        skewStrength = 0.05;
    }
}
window.addEventListener('resize', updateDimensions);
updateDimensions();

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function animate() {
    currentScroll = lerp(currentScroll, targetScroll, EASE);
    
    container.scrollLeft = currentScroll;

    const diff = targetScroll - currentScroll;
    const skew = diff * skewStrength;
    
    content.style.transform = `skewX(${skew}deg)`;
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("wheel", (evt) => {
    updateDimensions();

    if (evt.deltaY !== 0) {
        evt.preventDefault();
        targetScroll += evt.deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    }
}, { passive: false });

let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    updateDimensions();
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (e.cancelable) {
        e.preventDefault();
    }
    
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    targetScroll += deltaY * 2.5; 
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
    touchStartY = touchEndY;
}, { passive: false });

targetScroll = container.scrollLeft;
currentScroll = container.scrollLeft;
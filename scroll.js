const container = document.querySelector(".container");
const content = document.querySelector("section");

// Config
const EASE = 0.12;
let skewStrength = 0.05; // Default (desktop)

// State
let currentScroll = 0;
let targetScroll = 0;
let maxScroll = 0;

// Initialize dimensions & physics
function updateDimensions() {
    maxScroll = container.scrollWidth - window.innerWidth;
    
    // Slight increase for small screens (< 600px) as requested
    if (window.innerWidth < 600) {
        skewStrength = 0.07; 
    } else {
        skewStrength = 0.05;
    }
}
window.addEventListener('resize', updateDimensions);
updateDimensions();

// Linear Interpolation Helper
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Animation Loop
function animate() {
    // Smoothly move current towards target
    currentScroll = lerp(currentScroll, targetScroll, EASE);
    
    // Apply scroll position
    container.scrollLeft = currentScroll;
    
    // Calculate skew based on velocity
    const diff = targetScroll - currentScroll;
    const skew = diff * skewStrength;
    
    // Apply skew
    content.style.transform = `skewX(${skew}deg)`;
    
    requestAnimationFrame(animate);
}

// Start Animation
animate();

// --- Event Listeners ---

// 1. Desktop Wheel (Vertical -> Horizontal)
window.addEventListener("wheel", (evt) => {
    // Recalculate max in case of dynamic loading
    updateDimensions();

    if (evt.deltaY !== 0) {
        evt.preventDefault();
        // Add to target, clamping to bounds
        targetScroll += evt.deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    }
}, { passive: false });

// 2. Mobile Touch (Vertical Swipe -> Horizontal)
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    updateDimensions();
}, { passive: false });

// Removed Snap Logic (auto-move caused lag feeling)

window.addEventListener('touchmove', (e) => {
    if (e.cancelable) {
        e.preventDefault();
    }
    
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY; // Drag Up = Scroll Right (Positive Delta)
    
    // Add to target with sensitivity multiplier
    targetScroll += deltaY * 2.5; 
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
    touchStartY = touchEndY;
}, { passive: false });

// Initial Sync
targetScroll = container.scrollLeft;
currentScroll = container.scrollLeft;
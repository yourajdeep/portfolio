const container = document.querySelector(".container");
const content = document.querySelector("section");

// Config
const EASE = 0.12; // Increased slightly for snappier feel
const SKEW_STRENGTH = 0.05; // Reduced effect (very subtle)

// State
let currentScroll = 0;
let targetScroll = 0;
let maxScroll = 0;

// Initialize dimensions
function updateMaxScroll() {
    maxScroll = container.scrollWidth - window.innerWidth;
}
window.addEventListener('resize', updateMaxScroll);
updateMaxScroll();

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
    const skew = diff * SKEW_STRENGTH;
    
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
    updateMaxScroll();

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
    updateMaxScroll();
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
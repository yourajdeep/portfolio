        const container = document.querySelector(".container");
        const content = document.querySelector("section");
        let currentPos = container.scrollLeft;

        const callDistort = function() {
            const newPos = container.scrollLeft;
            const diff = newPos - currentPos;
            const speed = diff * 0.15; // Adjusted speed for horizontal sensitivity

            content.style.transform = "skewX(" + speed + "deg)";
            currentPos = newPos;
            requestAnimationFrame(callDistort);
        };

        callDistort();
        
        // Add horizontal scroll on wheel for desktop
        window.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                container.scrollLeft += evt.deltaY;
            }
        }, { passive: false });

        // Add touch support for mobile (Vertical Swipe -> Horizontal Scroll)
        let touchStartY = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY; // Finger moving up = positive delta = scroll right
            
            container.scrollLeft += deltaY * 2; // Multiplier for sensitivity
            touchStartY = touchEndY; // Reset for continuous delta calculation
            
            if (e.cancelable) {
                e.preventDefault(); // Stop native vertical scroll
            }
        }, { passive: false });
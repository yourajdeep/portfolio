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
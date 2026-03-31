// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Theme Toggler Logic (Light / Dark Mode)
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check if user has a saved preference, otherwise default is dark-mode (set in HTML)
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
        body.className = savedTheme; // either 'light-mode' or 'dark-mode'
    } else {
        // default
        body.className = "dark-mode";
        localStorage.setItem("portfolio-theme", "dark-mode");
    }

    themeBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.replace("dark-mode", "light-mode");
            localStorage.setItem("portfolio-theme", "light-mode");
        } else {
            body.classList.replace("light-mode", "dark-mode");
            localStorage.setItem("portfolio-theme", "dark-mode");
        }
    });

    // 2. Intersection Observer for Smooth Scroll Animations
    // We target all elements with the classes 'reveal-up', 'reveal-left', 'reveal-right'
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element fully enters viewport
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add 'active' class to trigger CSS transition
            entry.target.classList.add("active");
            
            // Optional: Unobserve element so it only animates once
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Contact Form AJAX Submission
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm && submitBtn) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Stop standard redirect
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = "SENDING...";
            submitBtn.style.pointerEvents = "none";

            const formData = new FormData(contactForm);

            // Fetch to the AJAX endpoint prevents redirection
            fetch("https://formsubmit.co/ajax/mohitiit2005@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    // Success UI Change
                    submitBtn.innerHTML = "SENT MESSAGE ✔";
                    submitBtn.style.backgroundColor = "var(--text-color)";
                    submitBtn.style.color = "var(--bg-color)";
                    contactForm.reset();
                    
                    setTimeout(() => { 
                        submitBtn.innerHTML = originalText; 
                        submitBtn.style.pointerEvents = "auto";
                        submitBtn.style.backgroundColor = "var(--accent-color)";
                        submitBtn.style.color = "#000000";
                    }, 5000);
                } else {
                    throw new Error("Formsubmit rejected request.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Failure UI Change
                submitBtn.innerHTML = "ERROR! TRY AGAIN";
                submitBtn.style.backgroundColor = "var(--accent-secondary)";
                submitBtn.style.color = "#fff";
                
                setTimeout(() => { 
                    submitBtn.innerHTML = originalText; 
                    submitBtn.style.pointerEvents = "auto";
                    submitBtn.style.backgroundColor = "var(--accent-color)";
                    submitBtn.style.color = "#000000";
                }, 5000);
            });
        });
    }
    // 4. Dot & Ring Cursor + Parallax Grid Background
    const cursorDot = document.createElement("div");
    const cursorOutline = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    cursorOutline.classList.add("cursor-outline");
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    document.addEventListener("mousemove", (e) => {
        // Move Dot instantly
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        // Move Outline with a buttery smooth trailing animation
        cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 400, fill: "forwards" });

        // Parallax Background Shift
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 40; 
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
        document.body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .brutalist-card");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
             cursorOutline.classList.add("hovering");
             cursorDot.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
             cursorOutline.classList.remove("hovering");
             cursorDot.classList.remove("hovering");
        });
    });

    // 5. Horizontal Infinite Auto-Scroll Logic for Projects
    const scrollWrapper = document.getElementById("scroll-wrapper");
    const projectTrack = document.getElementById("project-track");

    if (scrollWrapper && projectTrack) {
        // Clone cards to create infinite loop seam
        const cards = Array.from(projectTrack.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            projectTrack.appendChild(clone);
        });

        let isHovered = false;
        let scrollSpeed = 1;

        // Pause auto-scroll on hover so links are easy to click
        scrollWrapper.addEventListener("mouseenter", () => isHovered = true);
        scrollWrapper.addEventListener("mouseleave", () => isHovered = false);

        // Touch interactions (pause scroll while touching)
        scrollWrapper.addEventListener("touchstart", () => isHovered = true, {passive: true});
        scrollWrapper.addEventListener("touchend", () => {
            setTimeout(() => isHovered = false, 1000);
        });

        function autoScroll() {
            if (!isHovered) {
                scrollWrapper.scrollLeft += scrollSpeed;
                
                // When we've scrolled exactly the width of the original set, snap back
                if (scrollWrapper.scrollLeft >= projectTrack.scrollWidth / 2) {
                    scrollWrapper.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }
        
        requestAnimationFrame(autoScroll);

        // Re-bind custom cursor logic to cloned elements
        const clonedInteractables = projectTrack.querySelectorAll("a, button, .brutalist-card");
        clonedInteractables.forEach(el => {
            // Remove previous event listeners by cloning if necessary, or just add since they're fresh clones
            el.addEventListener("mouseenter", () => {
                 cursorOutline.classList.add("hovering");
                 cursorDot.classList.add("hovering");
            });
            el.addEventListener("mouseleave", () => {
                 cursorOutline.classList.remove("hovering");
                 cursorDot.classList.remove("hovering");
            });
        });
    }
});

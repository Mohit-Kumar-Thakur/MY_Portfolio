// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    // 1. Theme Toggler Logic (Light / Dark Mode)
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Check if user has a saved preference, otherwise default is dark-mode (set in HTML)
    let savedTheme = null;
    try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (e) {}
    body.className = savedTheme || "dark-mode"; // either 'light-mode' or 'dark-mode'

    function toggleTheme() {
        const next = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
        body.className = next;
        try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    }
    themeBtn.addEventListener("click", toggleTheme);

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

    // 4. Dot & Ring Cursor + Parallax Grid Background (mouse devices only)
    let bindCursorHover = () => {};

    if (hasFinePointer) {
        document.documentElement.classList.add("has-custom-cursor");

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
            if (!prefersReducedMotion) {
                const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
                const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
                document.body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
            }
        });

        // Hover effect on interactive elements
        bindCursorHover = (elements) => {
            elements.forEach(el => {
                el.addEventListener("mouseenter", () => {
                     cursorOutline.classList.add("hovering");
                     cursorDot.classList.add("hovering");
                });
                el.addEventListener("mouseleave", () => {
                     cursorOutline.classList.remove("hovering");
                     cursorDot.classList.remove("hovering");
                });
            });
        };
        bindCursorHover(document.querySelectorAll("a, button, input, textarea, .brutalist-card, .cmdk-list li"));
    }

    // 5. Horizontal Infinite Auto-Scroll + Drag-to-Scroll for Projects
    const scrollWrapper = document.getElementById("scroll-wrapper");
    const projectTrack = document.getElementById("project-track");

    if (scrollWrapper && projectTrack) {
        // Clone cards to create infinite loop seam
        const cards = Array.from(projectTrack.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            clone.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
            projectTrack.appendChild(clone);
        });

        let isHovered = false;
        let isDragging = false;
        let dragMoved = false;
        let dragStartX = 0;
        let dragStartScroll = 0;
        const scrollSpeed = 1;
        const loopWidth = () => projectTrack.scrollWidth / 2;

        // Pause auto-scroll on hover so links are easy to click
        scrollWrapper.addEventListener("mouseenter", () => isHovered = true);
        scrollWrapper.addEventListener("mouseleave", () => { isHovered = false; isDragging = false; });

        // Touch interactions (pause scroll while touching)
        scrollWrapper.addEventListener("touchstart", () => isHovered = true, {passive: true});
        scrollWrapper.addEventListener("touchend", () => {
            setTimeout(() => isHovered = false, 1000);
        });

        // Mouse drag to scroll
        scrollWrapper.addEventListener("mousedown", (e) => {
            isDragging = true;
            dragMoved = false;
            dragStartX = e.pageX;
            dragStartScroll = scrollWrapper.scrollLeft;
        });
        window.addEventListener("mouseup", () => isDragging = false);
        scrollWrapper.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const dx = e.pageX - dragStartX;
            if (Math.abs(dx) > 5) dragMoved = true;
            let next = dragStartScroll - dx;
            // Keep the loop seamless while dragging
            if (next < 0) { next += loopWidth(); dragStartScroll += loopWidth(); }
            if (next >= loopWidth()) { next -= loopWidth(); dragStartScroll -= loopWidth(); }
            scrollWrapper.scrollLeft = next;
        });
        // Swallow the click that ends a drag so it doesn't open a link
        scrollWrapper.addEventListener("click", (e) => {
            if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; }
        }, true);
        scrollWrapper.addEventListener("dragstart", (e) => e.preventDefault());

        function autoScroll() {
            if (!isHovered && !isDragging) {
                scrollWrapper.scrollLeft += scrollSpeed;

                // When we've scrolled exactly the width of the original set, snap back
                if (scrollWrapper.scrollLeft >= loopWidth()) {
                    scrollWrapper.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }

        if (!prefersReducedMotion) requestAnimationFrame(autoScroll);

        // Re-bind custom cursor logic to cloned elements
        bindCursorHover(Array.from(projectTrack.children).slice(cards.length).flatMap(clone =>
            [clone, ...clone.querySelectorAll("a, button")]
        ));
    }

    // 6. Scroll Progress Bar + Timeline Fill
    const progressBar = document.getElementById("scroll-progress");
    const timeline = document.getElementById("timeline");
    const timelineFill = document.getElementById("timeline-fill");

    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

        if (timeline && timelineFill) {
            const rect = timeline.getBoundingClientRect();
            const start = window.innerHeight * 0.75;
            const pct = Math.min(Math.max((start - rect.top) / rect.height, 0), 1);
            timelineFill.style.height = `${pct * 100}%`;
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 7. Active Nav Link Highlighting
    const navLinks = document.querySelectorAll(".nav-links a");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute("href"));
        if (section) sectionObserver.observe(section);
    });

    // 8. Mobile Hamburger Menu
    const menuBtn = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-links");
    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => {
            const open = navList.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.textContent = open ? "✕" : "☰";
        });
        navLinks.forEach(link => link.addEventListener("click", () => {
            navList.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        }));
    }

    // 9. Typewriter Role Rotator
    const rotator = document.getElementById("role-rotator");
    if (rotator && !prefersReducedMotion) {
        const roles = JSON.parse(rotator.dataset.roles);
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        function typeStep() {
            if (deleting) {
                charIndex--;
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            } else {
                charIndex++;
            }
            rotator.textContent = roles[roleIndex].slice(0, charIndex) || " ";

            let delay = deleting ? 40 : 80;
            if (!deleting && charIndex === roles[roleIndex].length) {
                deleting = true;
                delay = 2200; // Hold the full word
            }
            setTimeout(typeStep, delay);
        }
        setTimeout(typeStep, 2200);
    }

    // 10. Count-Up Stats
    const counters = document.querySelectorAll("[data-count]");
    function renderCount(el, value) {
        const decimals = Number(el.dataset.decimals || 0);
        el.textContent = `${el.dataset.prefix || ""}${value.toFixed(decimals)}${el.dataset.suffix || ""}`;
    }
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.dataset.count);
            observer.unobserve(el);

            if (prefersReducedMotion) { renderCount(el, target); return; }
            const duration = 1400;
            const startTime = performance.now();
            function tick(now) {
                const t = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                renderCount(el, target * eased);
                if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.6 });
    counters.forEach(el => countObserver.observe(el));

    // 11. 3D Tilt + Spotlight Cards
    if (hasFinePointer && !prefersReducedMotion) {
        document.querySelectorAll(".tilt, .spotlight").forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                card.style.setProperty("--mx", `${x * 100}%`);
                card.style.setProperty("--my", `${y * 100}%`);
                card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
                card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
            });
            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }

    // 12. Magnetic Buttons
    if (hasFinePointer && !prefersReducedMotion) {
        document.querySelectorAll(".magnetic").forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const dy = (e.clientY - rect.top - rect.height / 2) * 0.35;
                // Keep the brutalist "press into shadow" offset while following the cursor
                btn.style.transform = `translate(calc(var(--shadow-offset) + ${dx}px), calc(var(--shadow-offset) + ${dy}px))`;
            });
            btn.addEventListener("mouseleave", () => btn.style.transform = "");
        });
    }

    // 13. Scramble-Text Section Titles
    const glyphs = "!<>-_\\/[]{}=+*^?#01";
    function scramble(el) {
        const textNodes = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
        }
        textNodes.forEach(node => {
            const original = node.nodeValue;
            let frame = 0;
            const totalFrames = 18;
            function step() {
                const revealed = Math.floor((frame / totalFrames) * original.length);
                node.nodeValue = original.split("").map((ch, i) =>
                    i < revealed || ch === " " ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]
                ).join("");
                frame++;
                if (frame <= totalFrames) requestAnimationFrame(step);
                else node.nodeValue = original;
            }
            step();
        });
    }
    if (!prefersReducedMotion) {
        const scrambleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                scramble(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll(".scramble").forEach(el => scrambleObserver.observe(el));
    }

    // 14. Copy Email Button
    const copyBtn = document.getElementById("copy-email");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const original = copyBtn.textContent;
            navigator.clipboard.writeText(copyBtn.dataset.email)
                .then(() => copyBtn.textContent = "COPIED ✔")
                .catch(() => copyBtn.textContent = "COPY FAILED")
                .finally(() => setTimeout(() => copyBtn.textContent = original, 2000));
        });
    }

    // 15. Command Palette (Ctrl/⌘ + K)
    const cmdk = document.getElementById("cmdk");
    const cmdkInput = document.getElementById("cmdk-input");
    const cmdkItems = Array.from(document.querySelectorAll("#cmdk-list li"));
    const cmdkOpenBtn = document.getElementById("cmdk-open");
    let selectedIndex = 0;

    const visibleItems = () => cmdkItems.filter(li => !li.hidden);
    function highlight() {
        const items = visibleItems();
        cmdkItems.forEach(li => li.classList.remove("selected"));
        if (items.length) {
            selectedIndex = Math.min(selectedIndex, items.length - 1);
            items[selectedIndex].classList.add("selected");
            items[selectedIndex].scrollIntoView({ block: "nearest" });
        }
    }
    function openCmdk() {
        cmdk.hidden = false;
        cmdkInput.value = "";
        cmdkItems.forEach(li => li.hidden = false);
        selectedIndex = 0;
        highlight();
        cmdkInput.focus();
    }
    function closeCmdk() { cmdk.hidden = true; }
    function runItem(li) {
        closeCmdk();
        if (li.dataset.action === "theme") return toggleTheme();
        const href = li.dataset.href;
        if (li.hasAttribute("data-external")) window.open(href, "_blank");
        else document.querySelector(href)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }

    if (cmdk && cmdkInput) {
        cmdkOpenBtn?.addEventListener("click", openCmdk);
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                cmdk.hidden ? openCmdk() : closeCmdk();
            } else if (!cmdk.hidden) {
                const items = visibleItems();
                if (e.key === "Escape") closeCmdk();
                else if (e.key === "ArrowDown") { e.preventDefault(); selectedIndex = (selectedIndex + 1) % Math.max(items.length, 1); highlight(); }
                else if (e.key === "ArrowUp") { e.preventDefault(); selectedIndex = (selectedIndex - 1 + items.length) % Math.max(items.length, 1); highlight(); }
                else if (e.key === "Enter" && items[selectedIndex]) { e.preventDefault(); runItem(items[selectedIndex]); }
            }
        });
        cmdkInput.addEventListener("input", () => {
            const q = cmdkInput.value.toLowerCase().trim();
            cmdkItems.forEach(li => li.hidden = !li.textContent.toLowerCase().includes(q));
            selectedIndex = 0;
            highlight();
        });
        cmdkItems.forEach(li => li.addEventListener("click", () => runItem(li)));
        cmdk.addEventListener("click", (e) => { if (e.target === cmdk) closeCmdk(); });
    }
});

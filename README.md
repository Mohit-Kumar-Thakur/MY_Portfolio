# Mohit Kumar Thakur 🟨 Neo-Brutalist Portfolio

**Live:** [my-portfolio-three-tan-43.vercel.app](https://my-portfolio-three-tan-43.vercel.app)

A Neo-Brutalist portfolio for my work in agentic AI, ML pipelines, full-stack development, and research on ML-driven routing for hybrid VLC/RF vehicular and aerial networks.

## What's Inside
- **About:** background, count-up stats (CGPA, LeetCode rating, GfG institute rank, hackathon win), achievements and certifications.
- **Technical Arsenal:** a bento grid of skills, grouped into Languages, Frameworks/Libraries, Developer Tools, Cloud/Databases, AI/ML & GenAI, and CS Fundamentals.
- **Experience:** Research Intern at IIIT Delhi, Feb–Aug 2026 (Hybrid VLC/RF Vehicular & Aerial Networks), shown as a scroll-drawn timeline.
- **Research Work:**
  - [Hierarchical Intent-Aware Routing for Hybrid VLC/RF VANET-FANET Networks](https://github.com/Mohit-Kumar-Thakur/hybrid-vlc-rf-vanet-fanet-routing)
  - [ML-Driven Utility-Based Hybrid VLC-RF Routing for Congestion-Aware UAV-Assisted VANETs](https://github.com/Mohit-Kumar-Thakur/ML-Driven-Utility-Based-Hybrid-VLC-RF-Routing-for-Congestion-Aware-UAV-Assisted-VANETs)
- **Projects:**
  - [AI Research Agent](https://ai-research-agent-omega-ten.vercel.app): FastAPI, Celery/Redis, PostgreSQL, Groq LLM, React
  - [Weather Data Pipeline with ML Prediction](https://weather-prediction-pipeline.onrender.com): PostgreSQL, XGBoost, FastAPI (R² = 0.9975)
  - [DevNest](https://github.com/Mohit-Kumar-Thakur/devNest): React/TypeScript, Node.js, MongoDB, Socket.IO
  - [MediGenie](https://github.com/Mohit-Kumar-Thakur/MediGenie): React, FastAPI, MongoDB, scikit-learn
  - [Interview Coach](https://github.com/Mohit-Kumar-Thakur/interview-coach-copilot) and Movies Engine
- **Latest Update:** a live LinkedIn feed (Elfsight), restyled to match the site.
- **Contact:** a working contact form through [formsubmit.co](https://formsubmit.co), plus a copy-email button.

## Architecture & Design
Plain **HTML5, CSS3 and vanilla JavaScript**, with no framework and no build step, so it loads fast.

**Interactive features:**
- **Neo-Brutalist look:** high-contrast black, white, yellow and pink, with thick borders, hard drop shadows, and light/dark themes.
- **Command palette:** press `Ctrl + K` / `⌘ + K` to jump to any section, switch theme, or open links.
- **Scroll effects:** a scroll-progress bar, the nav highlights the section you're on, content reveals as you scroll, and the timeline fills in.
- **Motion:** typewriter role rotator, count-up stats, scramble-text headings, magnetic buttons, and 3D-tilt cards with a glow that follows the cursor.
- **Infinite project carousel:** auto-scrolls in a loop, pauses on hover, and can be dragged.
- **Custom cursor:** a trailing dot-and-ring cursor that inverts colors, on mouse devices only.
- **Mobile friendly:** responsive layout with a hamburger menu.
- **Accessible motion:** all animation turns off when the visitor has set `prefers-reduced-motion`.

## Project Structure
```
index.html                     # All sections and content
style.css                      # Theme tokens, components, responsive rules
script.js                      # Interactions (theme, reveals, carousel, command palette, ...)
*.png                          # Project preview images
Mohit_Kumar_Thakur_Resume.pdf  # Resume linked from the site
vercel.json / netlify.toml     # Hosting configuration
```

## Run Locally
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deployment
The site is fully static, so any static host works.

1. **Vercel** (current host): `vercel deploy --prod`. Caching and clean-URL rules are in `vercel.json`.
2. **Netlify**: configuration is in `netlify.toml`.
3. **GitHub Pages**: serves `index.html` directly from the `main` branch.

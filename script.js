const GITHUB_USERNAME = "Samsanap45";
const projectsContainer = document.getElementById("projectsContainer");
const repoCount = document.getElementById("repoCount");

// Supported theme sequence
const THEMES = ["dark", "blue", "amethyst", "ember", "forest", "light"];

// Curated highlights for repositories with tailored tech stack pills
const FEATURED_HIGHLIGHTS = {
  "lawyer-connect": {
    badge: "FULL-STACK WEB PLATFORM",
    icon: "⚖️",
    description: "Online legal consultation platform connecting clients to verified lawyers with appointment bookings and real-time query management.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT", "Bootstrap"]
  },
  "portfolio": {
    badge: "FRONTEND & UI DESIGN",
    icon: "⚡",
    description: "Personal developer portfolio engineered with modern glassmorphism, responsive CSS variables, and dynamic GitHub API auto-sync.",
    tech: ["JavaScript", "HTML5", "CSS3 Variables", "Glassmorphism", "GitHub API"]
  }
};

const LANGUAGE_ICONS = {
  "JavaScript": "🌐",
  "Python": "🐍",
  "Java": "☕",
  "Dart": "📱",
  "C++": "⚙️",
  "HTML": "🎨"
};

/* ========================================================
   THEME SWITCHING & PERSISTENCE
   ======================================================== */
const themeToggleBtn = document.getElementById("themeToggle");
const paletteDots = document.querySelectorAll(".palette-dot");

function setTheme(themeName) {
  if (!THEMES.includes(themeName)) themeName = "dark";
  document.body.setAttribute("data-theme", themeName);
  localStorage.setItem("portfolio_selected_theme", themeName);

  // Update active dot in the palette
  paletteDots.forEach(dot => {
    if (dot.getAttribute("data-theme-val") === themeName) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Initial theme load from localStorage
const savedTheme = localStorage.getItem("portfolio_selected_theme") || "dark";
setTheme(savedTheme);

// Theme palette dot clicks
paletteDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const val = dot.getAttribute("data-theme-val");
    setTheme(val);
  });
});

// Cycle theme button click
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") || "dark";
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  });
}

/* ========================================================
   GITHUB REPO LOADER
   ======================================================== */
async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
    );

    if (!response.ok) throw new Error("GitHub API request failed");

    const repos = await response.json();
    const ownRepos = repos.filter(repo => !repo.fork);

    repoCount.innerText = `${ownRepos.length}+`;
    projectsContainer.innerHTML = "";

    const displayRepos = ownRepos.slice(0, 4);

    displayRepos.forEach(repo => {
      const slug = repo.name.toLowerCase();
      const meta = FEATURED_HIGHLIGHTS[slug] || null;

      const category = meta?.badge || (repo.language ? repo.language.toUpperCase() : "DEVELOPMENT");
      const icon = meta?.icon || (repo.language && LANGUAGE_ICONS[repo.language]) || "💻";
      const title = repo.name.replace(/[-_]/g, " ");
      const description = meta?.description || repo.description || "A practical software project designed with clean architecture and modern standards.";
      const techList = meta?.tech || [repo.language || "Software", "Git", "Clean Architecture"];

      const card = document.createElement("article");
      card.className = "project glow-card";
      card.innerHTML = `
        <div class="project-banner">
          <div class="banner-top">
            <div class="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <small>${category}</small>
          </div>
          <div class="banner-icon">${icon}</div>
        </div>

        <div class="project-content">
          <h3>${title}</h3>
          <p>${description}</p>
          
          <div class="project-tech">
            ${techList.map(t => `<span>${t}</span>`).join("")}
          </div>

          <div class="project-links">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Source Code ↗</a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>` : ""}
          </div>
        </div>
      `;
      projectsContainer.appendChild(card);
    });

  } catch (error) {
    // Offline/Rate-limit fallback
    repoCount.innerText = "5+";
    projectsContainer.innerHTML = `
      <article class="project glow-card">
        <div class="project-banner">
          <div class="banner-top">
            <div class="window-dots"><span></span><span></span><span></span></div>
            <small>FULL-STACK WEB PLATFORM</small>
          </div>
          <div class="banner-icon">⚖️</div>
        </div>
        <div class="project-content">
          <h3>Lawyer Connect</h3>
          <p>Online legal consultation portal connecting clients to verified lawyers with appointment bookings and real-time query management.</p>
          <div class="project-tech">
            <span>Node.js</span><span>Express</span><span>MongoDB</span><span>REST APIs</span><span>JWT</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">Source Code ↗</a>
          </div>
        </div>
      </article>

      <article class="project glow-card">
        <div class="project-banner">
          <div class="banner-top">
            <div class="window-dots"><span></span><span></span><span></span></div>
            <small>CROSS-PLATFORM MOBILE</small>
          </div>
          <div class="banner-icon">📱</div>
        </div>
        <div class="project-content">
          <h3>Flutter & AI Explorations</h3>
          <p>Practical cross-platform mobile apps, utility tools, and applied machine learning models built during engineering coursework.</p>
          <div class="project-tech">
            <span>Flutter</span><span>Dart</span><span>Python</span><span>Scikit-Learn</span><span>Firebase</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">Source Code ↗</a>
          </div>
        </div>
      </article>
    `;
  }
}

/* ========================================================
   MOBILE NAVIGATION TOGGLE & AUTO-CLOSE
   ======================================================== */
const menuBtn = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.onclick = () => {
    nav.classList.toggle("open");
  };

  document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// INITIALIZE
loadProjects();

// Reading Scroll Progress Indicator
const progressBar = document.getElementById("scrollProgressBar");

window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressPercent = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = `${progressPercent}%`;
}, { passive: true });

// ==========================================
// 1. LIVE ACTIVE LINK HIGHLIGHTING
// ==========================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#nav a");

const navObserverOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px", // triggers when section is in the upper-mid view
  threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, navObserverOptions);

sections.forEach((section) => navObserver.observe(section));

// ==========================================
// 2. SCROLL REVEAL (FADE & SLIDE UP)
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserverOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px", // triggers just before element touches bottom of screen
  threshold: 0.12
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Once visible, stop observing so the animation only runs once smoothly
      observer.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

revealElements.forEach((el) => revealObserver.observe(el));
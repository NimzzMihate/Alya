const GITHUB_USER = "NimzzMihate";
const GITHUB_REPO = "alya-data";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main`;

async function fetchData(file) {
  try {
    const res = await fetch(`${RAW_BASE}/${file}?t=${Date.now()}`);
    if (!res.ok) throw new Error("not found");
    return await res.json();
  } catch (e) {
    return null;
  }
}

const PAGES = [
  { href: "index.html",       icon: "fa-house",       label: "Home" },
  { href: "status.html",      icon: "fa-signal",      label: "Status" },
  { href: "dashboard.html",   icon: "fa-chart-line",  label: "Dashboard" },
  { href: "commands.html",    icon: "fa-terminal",    label: "Commands" },
  { href: "leaderboard.html", icon: "fa-trophy",      label: "Leaderboard" },
  { href: "snippets.html",    icon: "fa-code",        label: "Snippets" },
  { href: "portfolio.html",   icon: "fa-user",        label: "Portfolio" },
  { href: "linktree.html",    icon: "fa-link",        label: "Links" },
  { href: "contribute.html",  icon: "fa-heart",       label: "Contribute" },
  { href: "feedback.html",    icon: "fa-paper-plane", label: "Feedback" },
];

function renderNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const nav = document.getElementById("navbar");
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-inner">
      <div class="nav-logo">
        <i class="fa-solid fa-robot"></i>
        ALYA MD
      </div>
      <div class="nav-right-group">
        <div class="nav-updated" id="navUpdated">-</div>
        <button class="nav-icon-btn" id="hamburger" onclick="toggleMenu()" title="Menu">
          <i class="fa-solid fa-bars" id="hamburgerIcon"></i>
        </button>
      </div>
    </div>
    <div class="nav-dropdown" id="navDropdown">
      <div class="nav-dropdown-inner">
        ${PAGES.map(p => `
          <a href="${p.href}" class="nav-dropdown-link ${current === p.href ? "active" : ""}" onclick="closeMenu()">
            <i class="fa-solid ${p.icon}"></i>
            <span>${p.label}</span>
            ${current === p.href ? '<i class="fa-solid fa-circle-dot nav-active-dot"></i>' : ''}
          </a>`).join("")}
      </div>
    </div>
    <div class="nav-overlay" id="navOverlay" onclick="closeMenu()"></div>`;
}

function toggleMenu() {
  const dropdown = document.getElementById("navDropdown");
  const overlay = document.getElementById("navOverlay");
  const icon = document.getElementById("hamburgerIcon");
  const isOpen = dropdown.classList.contains("open");
  if (isOpen) {
    dropdown.classList.remove("open");
    overlay.classList.remove("show");
    icon.className = "fa-solid fa-bars";
  } else {
    dropdown.classList.add("open");
    overlay.classList.add("show");
    icon.className = "fa-solid fa-xmark";
  }
}

function closeMenu() {
  const dropdown = document.getElementById("navDropdown");
  const overlay = document.getElementById("navOverlay");
  const icon = document.getElementById("hamburgerIcon");
  if (dropdown) dropdown.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
  if (icon) icon.className = "fa-solid fa-bars";
}

// Tutup dropdown kalau tap di luar
document.addEventListener("click", function(e) {
  const dropdown = document.getElementById("navDropdown");
  const hamburger = document.getElementById("hamburger");
  if (!dropdown || !hamburger) return;
  if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

function setLastUpdated(ts) {
  if (!ts) return;
  const el = document.getElementById("navUpdated");
  if (!el) return;
  el.textContent = `Updated: ${new Date(ts).toLocaleTimeString("id-ID")}`;
}

function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + "M";
  if (n >= 1000) return (n/1000).toFixed(1) + "K";
  return String(n);
}

function formatRuntime(s) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${h}h ${m}m ${sec}s`;
}

const NAV_CSS = `
  :root {
    --bg: #0d0d0d;
    --card: #161616;
    --border: #262626;
    --text-main: #ffffff;
    --text-dim: #aaaaaa;
    --text-sub: #666666;
    --accent: #4ade80;
    --nav-bg: rgba(13,13,13,0.95);
    --input-bg: #1a1a1a;
    --hover-bg: #1e1e1e;
  }

  html, body { overflow-x: hidden !important; }
  * { transition: background-color 0.2s ease, border-color 0.2s ease, color 0.15s ease; }
  body { background-color: var(--bg) !important; color: var(--text-main) !important; }

  /* STATS BAR fix hitam pas tap */
  .stats-bar-item { -webkit-tap-highlight-color: transparent !important; }
  .stats-bar-item:active { background: var(--card) !important; }

  #navbar {
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 300;
  }

  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 24px; height: 52px;
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    font-size: 14px; font-weight: 800; letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 8px;
    color: var(--text-main); white-space: nowrap;
  }
  .nav-logo i { color: var(--accent); font-size: 13px; }

  .nav-right-group { display: flex; align-items: center; gap: 8px; }
  .nav-updated { font-size: 11px; color: var(--text-sub); font-family: 'Fira Code', monospace; }

  .nav-icon-btn {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 7px; width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-dim); font-size: 13px;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .nav-icon-btn:hover { border-color: var(--accent); color: var(--accent); }

  .nav-dropdown {
    position: fixed;
    top: 52px; right: 0;
    width: 240px;
    background: var(--card);
    border-left: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    border-radius: 0 0 0 14px;
    padding: 10px;
    z-index: 299;
    transform: translateX(110%);
    visibility: hidden;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), visibility 0s linear 0.3s;
    max-height: calc(100vh - 52px);
    overflow-y: auto; overflow-x: hidden;
  }

  .nav-dropdown.open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), visibility 0s linear 0s;
  }

  .nav-dropdown-inner { display: flex; flex-direction: column; gap: 2px; }

  .nav-dropdown-link {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 8px;
    font-size: 13px; color: var(--text-dim);
    text-decoration: none; transition: all 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .nav-dropdown-link:hover { background: var(--hover-bg); color: var(--text-main); }
  .nav-dropdown-link.active { background: var(--hover-bg); color: var(--text-main); font-weight: 600; }
  .nav-dropdown-link i { font-size: 12px; width: 16px; text-align: center; }
  .nav-dropdown-link.active > i:first-child { color: var(--accent); }
  .nav-active-dot { margin-left: auto; font-size: 6px; color: var(--accent); }

  .nav-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.5); z-index: 298;
    backdrop-filter: blur(2px);
  }
  .nav-overlay.show { display: block; }

  @media (max-width: 700px) {
    .nav-inner { padding: 0 16px; }
    .nav-updated { display: none; }
  }
`;

function injectNavCSS() {
  const style = document.createElement("style");
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
}

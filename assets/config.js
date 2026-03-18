// Ganti dengan repo data kamu
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
      <div class="nav-links">
        ${PAGES.map(p => `
          <a href="${p.href}" class="nav-link ${current === p.href ? "active" : ""}">
            <i class="fa-solid ${p.icon}"></i>
            <span>${p.label}</span>
          </a>`).join("")}
      </div>
      <div class="nav-right">
        <div class="nav-updated" id="navUpdated">-</div>
      </div>
    </div>`;
}

function setLastUpdated(ts) {
  if (!ts) return;
  const el = document.getElementById("navUpdated");
  if (!el) return;
  const d = new Date(ts);
  el.textContent = `Updated: ${d.toLocaleTimeString("id-ID")}`;
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
  #navbar {
    background: rgba(13,13,13,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #262626;
    position: sticky; top: 0; z-index: 200;
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 24px; height: 56px;
    display: flex; align-items: center; gap: 24px;
  }
  .nav-logo {
    font-size: 14px; font-weight: 800; letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 8px;
    color: #fff; white-space: nowrap; flex-shrink: 0;
  }
  .nav-logo i { color: #4ade80; font-size: 13px; }
  .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
  .nav-link {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 11px; border-radius: 7px;
    font-size: 12px; color: #555; text-decoration: none;
    transition: all 0.2s; white-space: nowrap;
  }
  .nav-link:hover { color: #ccc; background: #1a1a1a; }
  .nav-link.active { color: #fff; background: #1e1e1e; }
  .nav-link i { font-size: 11px; }
  .nav-right { flex-shrink: 0; }
  .nav-updated { font-size: 11px; color: #333; font-family: 'Fira Code', monospace; }
  @media (max-width: 700px) {
    .nav-inner { padding: 0 12px; gap: 12px; }
    .nav-link span { display: none; }
    .nav-link { padding: 8px; }
    .nav-updated { display: none; }
  }
`;

function injectNavCSS() {
  const style = document.createElement("style");
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
}

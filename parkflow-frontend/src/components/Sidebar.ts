import { auth } from "../auth.js";

const icons: Record<string, string> = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>`,
  ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
  report: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

interface NavItem {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

const sidebarStyles = `
  .sidebar {
    width: 260px;
    height: 100vh;
    background: rgba(5, 5, 8, 0.98);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(201, 168, 76, 0.12);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    z-index: 100;
  }

  .sidebar::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(201, 168, 76, 0.3), transparent);
  }

  .sidebar-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(201, 168, 76, 0.08);
  }

  .neo-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .neo-logo-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(201, 168, 76, 0.4));
    transition: filter 0.3s ease;
  }

  .neo-logo:hover .neo-logo-img {
    filter: drop-shadow(0 0 15px rgba(201, 168, 76, 0.7));
  }

  .neo-logo-text h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #c9a84c, #f0d98a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .neo-logo-text span {
    font-size: 0.625rem;
    color: rgba(201, 168, 76, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .sidebar-nav {
    flex: 1;
    padding: 1.25rem 0.875rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .neo-nav-label {
    font-size: 0.625rem;
    font-weight: 700;
    color: rgba(201, 168, 76, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0 0.75rem;
    margin: 0.75rem 0 0.375rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.875rem;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    border: 1px solid transparent;
    position: relative;
  }

  .nav-item svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  .nav-item:hover {
    background: rgba(201, 168, 76, 0.06);
    color: rgba(201, 168, 76, 0.8);
    border-color: rgba(201, 168, 76, 0.1);
    transform: translateX(3px);
  }

  .nav-item:hover svg {
    color: rgba(201, 168, 76, 0.8);
  }

  .nav-item.active {
    background: rgba(201, 168, 76, 0.08);
    color: #c9a84c;
    border-color: rgba(201, 168, 76, 0.2);
    font-weight: 600;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    background: linear-gradient(180deg, #c9a84c, #f0d98a);
    border-radius: 0 3px 3px 0;
  }

  .nav-item.active svg { color: #c9a84c; }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid rgba(201, 168, 76, 0.08);
  }

  .neo-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(201, 168, 76, 0.04);
    border: 1px solid rgba(201, 168, 76, 0.1);
    border-radius: 12px;
    margin-bottom: 0.625rem;
  }

  .neo-user-avatar {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #c9a84c, #e8c96d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.8125rem;
    color: #050508;
    box-shadow: 0 2px 10px rgba(201, 168, 76, 0.3);
    flex-shrink: 0;
  }

  .neo-user-name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .neo-user-role {
    font-size: 0.625rem;
    color: rgba(201, 168, 76, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .neo-btn-logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.7rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.8125rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .neo-btn-logout svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  .neo-btn-logout:hover {
    background: rgba(231, 76, 60, 0.06);
    border-color: rgba(231, 76, 60, 0.2);
    color: rgba(231, 76, 60, 0.7);
    transform: translateY(-1px);
  }

  .neo-btn-logout:hover svg {
    transform: translateX(3px);
  }
`;

export class Sidebar {
  private element: HTMLElement;

  constructor() {
    const style = document.createElement("style");
    style.textContent = sidebarStyles;
    document.head.appendChild(style);
    this.element = this.create();
  }

  private create(): HTMLElement {
    const user = auth.getUser();
    if (!user) return document.createElement("div");

    const aside = document.createElement("aside");
    aside.className = "sidebar";

    // Header con logo
    const header = document.createElement("div");
    header.className = "sidebar-header";
    header.innerHTML = `
      <div class="neo-logo">
        <img class="neo-logo-img" src="/src/images/Parkflow.png" alt="NEO ParkFlow"/>
        <div class="neo-logo-text">
          <h1>NEO ParkFlow</h1>
          <span>Universidad de La Sabana</span>
        </div>
      </div>
    `;
    aside.appendChild(header);

    // Nav
    const nav = document.createElement("nav");
    nav.className = "sidebar-nav";

    const navItems: NavItem[] = [
      {
        path: "/attendant/dashboard",
        label: "Panel",
        icon: icons.dashboard,
        roles: ["ATTENDANT"],
      },
      {
        path: "/attendant/entry",
        label: "Registrar Entrada",
        icon: icons.car,
        roles: ["ATTENDANT"],
      },
      {
        path: "/attendant/reports",
        label: "Reportes",
        icon: icons.report,
        roles: ["ATTENDANT"],
      },
      {
        path: "/user/dashboard",
        label: "Mi Parqueo",
        icon: icons.car,
        roles: ["USER"],
      },
      {
        path: "/user/ticket",
        label: "Ticket & Pago",
        icon: icons.ticket,
        roles: ["USER"],
      },
      {
        path: "/admin/panel",
        label: "Panel Admin",
        icon: icons.chart,
        roles: ["ADMIN"],
      },
      {
        path: "/admin/workers",
        label: "Trabajadores",
        icon: icons.users,
        roles: ["ADMIN"],
      },
    ];

    const filtered = navItems.filter((item) => item.roles.includes(user.role));

    const label = document.createElement("div");
    label.className = "neo-nav-label";
    label.textContent = "Navegación";
    nav.appendChild(label);

    filtered.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.path;
      link.className = "nav-item";
      link.setAttribute("data-link", "");
      link.innerHTML = `${item.icon}<span>${item.label}</span>`;
      if (window.location.pathname === item.path) {
        link.classList.add("active");
      }
      nav.appendChild(link);
    });

    aside.appendChild(nav);

    // Footer
    const footer = document.createElement("div");
    footer.className = "sidebar-footer";
    footer.innerHTML = `
      <div class="neo-user-info">
        <div class="neo-user-avatar">${user.fullName.charAt(0).toUpperCase()}</div>
        <div style="flex:1;min-width:0;">
          <div class="neo-user-name">${user.fullName}</div>
          <div class="neo-user-role">${user.role}</div>
        </div>
      </div>
      <button class="neo-btn-logout" id="btn-logout">
        ${icons.logout}
        <span>Cerrar Sesión</span>
      </button>
    `;

    footer.querySelector("#btn-logout")?.addEventListener("click", () => {
      auth.logout();
    });

    aside.appendChild(footer);
    this.element = aside;
    return aside;
  }

  render(): HTMLElement {
    return this.element;
  }

  updateActive(path: string): void {
    this.element.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === path) {
        item.classList.add("active");
      }
    });
  }
}

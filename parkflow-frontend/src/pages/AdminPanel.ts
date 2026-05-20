import { Sidebar } from "../components/Sidebar.js";
import { spotApi } from "../api.js";
import { api } from "../api.js";
import { formatCurrency } from "../utils.js";

const icons = {
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  ticket: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
  dollar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
};

const adminStyles = `
  .admin-page { animation: adminFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  @keyframes adminFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .admin-header {
    height: 70px;
    background: rgba(5, 5, 8, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(201, 168, 76, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .admin-header-left {
    display: flex;
    flex-direction: column;
  }

  .admin-header-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.2;
  }

  .admin-header-sub {
    font-size: 0.6875rem;
    color: rgba(201, 168, 76, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .admin-stat-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(201, 168, 76, 0.1);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    cursor: default;
  }

  .admin-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.4), transparent);
  }

  .admin-stat-card:hover {
    border-color: rgba(201, 168, 76, 0.25);
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1);
  }

  .admin-stat-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  .admin-stat-card:hover .admin-stat-icon {
    transform: scale(1.1) rotate(-5deg);
  }

  .admin-stat-icon.gold { background: rgba(201,168,76,0.12); color: #c9a84c; box-shadow: 0 0 20px rgba(201,168,76,0.15); }
  .admin-stat-icon.blue { background: rgba(74,158,255,0.12); color: #4a9eff; box-shadow: 0 0 20px rgba(74,158,255,0.15); }
  .admin-stat-icon.green { background: rgba(46,204,113,0.12); color: #2ecc71; box-shadow: 0 0 20px rgba(46,204,113,0.15); }
  .admin-stat-icon.orange { background: rgba(243,156,18,0.12); color: #f39c12; box-shadow: 0 0 20px rgba(243,156,18,0.15); }

  .admin-stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.25rem;
    line-height: 1;
  }

  .admin-stat-label {
    font-size: 0.8125rem;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }

  .admin-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 1.75rem;
    border: 1px solid rgba(201, 168, 76, 0.1);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease;
  }

  .admin-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent);
  }

  .admin-card:hover {
    border-color: rgba(201, 168, 76, 0.2);
  }

  .admin-card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .admin-card-title::before {
    content: '';
    width: 3px;
    height: 16px;
    background: linear-gradient(180deg, #c9a84c, #f0d98a);
    border-radius: 2px;
  }

  .chart-ring-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .chart-ring-wrapper {
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
  }

  .chart-ring-svg {
    transform: rotate(-90deg);
    width: 140px;
    height: 140px;
  }

  .chart-ring-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .chart-ring-pct {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.875rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
  }

  .chart-ring-sub {
    font-size: 0.6875rem;
    color: rgba(201,168,76,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
  }

  .chart-legend {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .chart-legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.7);
  }

  .chart-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .chart-legend-val {
    font-weight: 700;
    color: #ffffff;
    margin-left: auto;
    font-family: 'Space Grotesk', sans-serif;
  }

  .tarifa-box {
    padding: 1rem 1.25rem;
    background: rgba(201, 168, 76, 0.05);
    border: 1px solid rgba(201, 168, 76, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tarifa-label {
    font-size: 0.8125rem;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .tarifa-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #c9a84c;
  }

  .btn-nuevo-celador {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: linear-gradient(135deg, #c9a84c, #e8c96d);
    color: #050508;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 15px rgba(201, 168, 76, 0.3);
  }

  .btn-nuevo-celador:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(201, 168, 76, 0.5);
  }

  .create-form-box {
    margin-bottom: 1.25rem;
    padding: 1.25rem;
    background: rgba(201, 168, 76, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(201, 168, 76, 0.12);
    animation: adminFadeIn 0.3s ease;
  }

  .create-form-title {
    font-size: 0.8125rem;
    font-weight: 700;
    color: rgba(201,168,76,0.7);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
  }

  .create-form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 10px;
    color: #ffffff;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
    outline: none;
    box-sizing: border-box;
  }

  .create-form-input:focus {
    border-color: rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.04);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
  }

  .create-form-input::placeholder { color: rgba(255,255,255,0.2); }

  .create-form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }

  .btn-crear {
    flex: 1;
    padding: 0.75rem;
    background: linear-gradient(135deg, #c9a84c, #e8c96d);
    color: #050508;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }

  .btn-crear:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,0.4); }

  .btn-cancelar {
    flex: 1;
    padding: 0.75rem;
    background: transparent;
    color: rgba(255,255,255,0.4);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }

  .btn-cancelar:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

  .worker-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.08);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .worker-row:hover {
    background: rgba(201,168,76,0.04);
    border-color: rgba(201,168,76,0.15);
    transform: translateX(3px);
  }

  .worker-avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #c9a84c, #e8c96d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #050508;
    font-weight: 800;
    font-size: 0.875rem;
    box-shadow: 0 2px 10px rgba(201,168,76,0.3);
    flex-shrink: 0;
  }

  .worker-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #ffffff;
  }

  .worker-username {
    font-size: 0.75rem;
    color: rgba(201,168,76,0.5);
    margin-top: 0.1rem;
  }

  .worker-base-badge {
    font-size: 0.6875rem;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.25rem 0.625rem;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 99px;
  }

  .btn-delete-worker {
    background: none;
    border: 1px solid rgba(231,76,60,0.2);
    border-radius: 8px;
    color: #e74c3c;
    cursor: pointer;
    padding: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .btn-delete-worker:hover {
    background: rgba(231,76,60,0.1);
    border-color: rgba(231,76,60,0.4);
    transform: scale(1.1);
  }

  .form-error {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    display: none;
    padding: 0.5rem 0.75rem;
    background: rgba(231,76,60,0.08);
    border-radius: 8px;
    border: 1px solid rgba(231,76,60,0.15);
  }

  .workers-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    max-height: 280px;
    overflow-y: auto;
  }

  .empty-workers {
    text-align: center;
    padding: 2rem 1rem;
    color: rgba(255,255,255,0.2);
    font-size: 0.875rem;
  }
`;

export class AdminPanel {
  private container: HTMLDivElement;
  private stats: any = null;
  private workers: any[] = [];

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "layout";

    const style = document.createElement("style");
    style.textContent = adminStyles;
    document.head.appendChild(style);
  }

  async render(): Promise<HTMLDivElement> {
    try {
      [this.stats, this.workers] = await Promise.all([
        spotApi.getStats(),
        api.get<any[]>("/auth/workers"),
      ]);
    } catch (error) {
      console.error("Error cargando datos admin:", error);
      this.workers = [];
    }

    const sidebar = new Sidebar();
    this.container.appendChild(sidebar.render());

    const main = document.createElement("div");
    main.className = "main-content admin-page";

    // Header
    const header = document.createElement("header");
    header.className = "admin-header";
    header.innerHTML = `
      <div class="admin-header-left">
        <div class="admin-header-title">Panel Administrativo</div>
        <div class="admin-header-sub">NEO ParkFlow — Universidad de La Sabana</div>
      </div>
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <div style="width:8px;height:8px;background:#2ecc71;border-radius:50%;box-shadow:0 0 8px rgba(46,204,113,0.8);animation:badgePulse 2s ease-in-out infinite;"></div>
        <span style="font-size:0.8125rem;color:rgba(255,255,255,0.4);">Sistema activo</span>
      </div>
    `;
    main.appendChild(header);

    const content = document.createElement("div");
    content.style.cssText = "padding: 2rem;";

    // Stats grid
    const statsGrid = document.createElement("div");
    statsGrid.style.cssText =
      "display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 1.75rem;";

    const statsData = [
      {
        icon: icons.users,
        value: String(this.workers.length),
        label: "Celadores Activos",
        color: "gold",
      },
      {
        icon: icons.ticket,
        value: String(this.stats?.occupiedSpots || 0),
        label: "Vehículos Actuales",
        color: "blue",
      },
      {
        icon: icons.dollar,
        value: formatCurrency(this.stats?.todayRevenue || 0),
        label: "Ingresos del Día",
        color: "green",
      },
      {
        icon: icons.chart,
        value: `${Math.round(this.stats?.occupancyRate || 0)}%`,
        label: "Ocupación Actual",
        color: "orange",
      },
    ];

    statsData.forEach((s) => {
      const card = document.createElement("div");
      card.className = "admin-stat-card";
      card.innerHTML = `
        <div class="admin-stat-icon ${s.color}">${s.icon}</div>
        <div class="admin-stat-value">${s.value}</div>
        <div class="admin-stat-label">${s.label}</div>
      `;
      statsGrid.appendChild(card);
    });
    content.appendChild(statsGrid);

    // Bottom grid
    const grid = document.createElement("div");
    grid.style.cssText =
      "display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;";
    grid.appendChild(this.renderChart());
    grid.appendChild(this.renderWorkersPanel());
    content.appendChild(grid);

    main.appendChild(content);
    this.container.appendChild(main);

    return this.container;
  }

  private renderChart(): HTMLElement {
    const card = document.createElement("div");
    card.className = "admin-card";

    const total = this.stats?.totalSpots || 9;
    const occupied = this.stats?.occupiedSpots || 0;
    const available = this.stats?.availableSpots || total;
    const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;
    const dash = total > 0 ? (occupied / total) * 100 : 0;

    card.innerHTML = `
      <div class="admin-card-title">Estado del Parqueadero</div>
      <div class="chart-ring-container">
        <div class="chart-ring-wrapper">
          <svg class="chart-ring-svg" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2.5"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#goldRing)" stroke-width="2.5"
              stroke-dasharray="${dash} 100" stroke-linecap="round"
              style="transition: stroke-dasharray 1s ease;"/>
            <defs>
              <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#c9a84c"/>
                <stop offset="100%" style="stop-color:#f0d98a"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-ring-center">
            <div class="chart-ring-pct">${pct}%</div>
            <div class="chart-ring-sub">ocupación</div>
          </div>
        </div>
        <div class="chart-legend">
          <div class="chart-legend-item">
            <div class="chart-legend-dot" style="background:#c9a84c;box-shadow:0 0 8px rgba(201,168,76,0.5);"></div>
            <span>Ocupadas</span>
            <span class="chart-legend-val">${occupied}</span>
          </div>
          <div class="chart-legend-item">
            <div class="chart-legend-dot" style="background:#2ecc71;box-shadow:0 0 8px rgba(46,204,113,0.5);"></div>
            <span>Disponibles</span>
            <span class="chart-legend-val">${available}</span>
          </div>
          <div class="chart-legend-item">
            <div class="chart-legend-dot" style="background:rgba(255,255,255,0.15);"></div>
            <span>Total</span>
            <span class="chart-legend-val">${total}</span>
          </div>
        </div>
      </div>
      <div class="tarifa-box">
        <div class="tarifa-label">Tarifa estándar</div>
        <div class="tarifa-value">${formatCurrency(3000)} / hora</div>
      </div>
    `;
    return card;
  }

  private renderWorkersPanel(): HTMLElement {
    const card = document.createElement("div");
    card.className = "admin-card";
    card.id = "workers-panel";
    this.buildWorkersPanel(card);
    return card;
  }

  private buildWorkersPanel(card: HTMLElement): void {
    card.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
        <div class="admin-card-title" style="margin-bottom:0;">Celadores</div>
        <button id="btn-show-form" class="btn-nuevo-celador">
          ${icons.plus} Nuevo Celador
        </button>
      </div>

      <div id="create-form" class="create-form-box" style="display:none;">
        <div class="create-form-title">Crear nuevo celador</div>
        <input id="worker-name" type="text" placeholder="Nombre completo" class="create-form-input"/>
        <input id="worker-user" type="text" placeholder="Usuario (ej: celador2)" class="create-form-input"/>
        <input id="worker-pass" type="password" placeholder="Contraseña" class="create-form-input" style="margin-bottom:0;"/>
        <div class="create-form-actions">
          <button id="btn-create-worker" class="btn-crear">Crear Celador</button>
          <button id="btn-cancel-form" class="btn-cancelar">Cancelar</button>
        </div>
        <p id="form-error" class="form-error"></p>
      </div>

      <div id="workers-list" class="workers-list">
        ${
          this.workers.length === 0
            ? '<div class="empty-workers">No hay celadores registrados</div>'
            : this.workers.map((w) => this.workerRow(w)).join("")
        }
      </div>
    `;

    card.querySelector("#btn-show-form")?.addEventListener("click", () => {
      const form = card.querySelector("#create-form") as HTMLElement;
      form.style.display = form.style.display === "none" ? "block" : "none";
    });

    card.querySelector("#btn-cancel-form")?.addEventListener("click", () => {
      (card.querySelector("#create-form") as HTMLElement).style.display =
        "none";
    });

    card
      .querySelector("#btn-create-worker")
      ?.addEventListener("click", async () => {
        const fullName = (
          card.querySelector("#worker-name") as HTMLInputElement
        ).value.trim();
        const username = (
          card.querySelector("#worker-user") as HTMLInputElement
        ).value.trim();
        const password = (
          card.querySelector("#worker-pass") as HTMLInputElement
        ).value.trim();
        const errorEl = card.querySelector("#form-error") as HTMLElement;

        if (!fullName || !username || !password) {
          errorEl.textContent = "Todos los campos son obligatorios";
          errorEl.style.display = "block";
          return;
        }

        try {
          await api.post<any>("/auth/register", {
            fullName,
            username,
            email: `${username}@parkflow.com`,
            password,
            role: "ATTENDANT",
          });
          this.workers.push({ username, fullName, role: "ATTENDANT" });
          const list = card.querySelector("#workers-list") as HTMLElement;
          list.innerHTML = this.workers.map((w) => this.workerRow(w)).join("");
          this.attachDeleteListeners(card);
          (card.querySelector("#create-form") as HTMLElement).style.display =
            "none";
          (card.querySelector("#worker-name") as HTMLInputElement).value = "";
          (card.querySelector("#worker-user") as HTMLInputElement).value = "";
          (card.querySelector("#worker-pass") as HTMLInputElement).value = "";
          errorEl.style.display = "none";
          const statVal = this.container.querySelector(".admin-stat-value");
          if (statVal) statVal.textContent = String(this.workers.length);
        } catch (e: any) {
          errorEl.textContent = e.message || "Error al crear celador";
          errorEl.style.display = "block";
        }
      });

    this.attachDeleteListeners(card);
  }

  private workerRow(w: any): string {
    const isBase = w.username === "celador";
    return `
      <div class="worker-row" data-username="${w.username}">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div class="worker-avatar">${w.fullName.charAt(0).toUpperCase()}</div>
          <div>
            <div class="worker-name">${w.fullName}</div>
            <div class="worker-username">@${w.username}</div>
          </div>
        </div>
        ${
          isBase
            ? '<span class="worker-base-badge">Base</span>'
            : `<button class="btn-delete-worker" data-username="${w.username}">${icons.trash}</button>`
        }
      </div>
    `;
  }

  private attachDeleteListeners(card: HTMLElement): void {
    card.querySelectorAll(".btn-delete-worker").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const username = (e.currentTarget as HTMLElement).dataset.username!;
        if (!confirm(`¿Eliminar al celador @${username}?`)) return;
        try {
          await api.delete(`/auth/workers/${username}`);
          this.workers = this.workers.filter((w) => w.username !== username);
          const list = card.querySelector("#workers-list") as HTMLElement;
          list.innerHTML = this.workers.map((w) => this.workerRow(w)).join("");
          this.attachDeleteListeners(card);
        } catch {
          alert("Error al eliminar celador");
        }
      });
    });
  }
}

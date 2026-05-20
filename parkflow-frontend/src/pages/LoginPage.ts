import { auth } from "../auth.js";
import { router } from "../router.js";

export class LoginPage {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.id = "neo-login";
  }

  render(): HTMLDivElement {
    this.container.innerHTML = "";

    // Inject styles
    const style = document.createElement("style");
    style.textContent = `
      #neo-login {
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #050508;
        position: relative;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
      }

      /* Animated grid background */
      #neo-login::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: gridMove 20s linear infinite;
      }

      @keyframes gridMove {
        0% { transform: translateY(0); }
        100% { transform: translateY(60px); }
      }

      /* Glowing orbs */
      .neo-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
        animation: orbFloat 8s ease-in-out infinite;
      }

      .neo-orb-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(201, 168, 76, 0.12), transparent 70%);
        top: -200px;
        right: -100px;
        animation-delay: 0s;
      }

      .neo-orb-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(74, 158, 255, 0.08), transparent 70%);
        bottom: -150px;
        left: -100px;
        animation-delay: -4s;
      }

      .neo-orb-3 {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(201, 168, 76, 0.06), transparent 70%);
        top: 50%;
        left: 30%;
        animation-delay: -2s;
      }

      @keyframes orbFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-30px) scale(1.05); }
      }

      /* Floating particles */
      .neo-particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(201, 168, 76, 0.6);
        border-radius: 50%;
        animation: particleFloat linear infinite;
      }

      @keyframes particleFloat {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
      }

      /* Main card */
      .neo-card {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 420px;
        padding: 2.5rem;
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border: 1px solid rgba(201, 168, 76, 0.15);
        border-radius: 24px;
        box-shadow: 
          0 32px 80px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.03),
          inset 0 1px 0 rgba(255, 255, 255, 0.05);
        animation: cardAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes cardAppear {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .neo-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 15%;
        right: 15%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.6), transparent);
        border-radius: 1px;
      }

      /* Logo section */
      .neo-logo {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .neo-logo-icon {
        width: 72px;
        height: 72px;
        margin: 0 auto 1.25rem;
        background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
        background-size: 200% 200%;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 
          0 8px 30px rgba(201, 168, 76, 0.5),
          0 0 60px rgba(201, 168, 76, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
        animation: logoShimmer 3s ease infinite, logoPulse 3s ease-in-out infinite;
      }

      @keyframes logoShimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes logoPulse {
        0%, 100% { box-shadow: 0 8px 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.3); }
        50% { box-shadow: 0 8px 40px rgba(201,168,76,0.7), 0 0 80px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,255,255,0.3); }
      }

      .neo-logo-icon svg {
        color: #050508;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
      }

      .neo-title {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 0.4rem;
        background: linear-gradient(135deg, #ffffff 0%, #c9a84c 50%, #ffffff 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: titleShimmer 4s ease infinite;
      }

      @keyframes titleShimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .neo-subtitle {
        font-size: 0.8125rem;
        color: rgba(255, 255, 255, 0.35);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-weight: 500;
      }

      /* Form */
      .neo-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .neo-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .neo-label {
        font-size: 0.75rem;
        font-weight: 700;
        color: rgba(201, 168, 76, 0.7);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .neo-input-wrapper {
        position: relative;
      }

      .neo-input-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(201, 168, 76, 0.4);
        pointer-events: none;
        transition: color 0.3s ease;
      }

      .neo-input {
        width: 100%;
        padding: 0.9rem 1rem 0.9rem 2.75rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(201, 168, 76, 0.12);
        border-radius: 12px;
        color: #ffffff;
        font-size: 0.9375rem;
        font-family: 'Inter', sans-serif;
        transition: all 0.3s ease;
        outline: none;
      }

      .neo-input::placeholder {
        color: rgba(255, 255, 255, 0.18);
      }

      .neo-input:focus {
        border-color: rgba(201, 168, 76, 0.45);
        background: rgba(201, 168, 76, 0.04);
        box-shadow: 
          0 0 0 3px rgba(201, 168, 76, 0.08),
          0 0 20px rgba(201, 168, 76, 0.05);
      }

      .neo-input:focus + .neo-input-icon,
      .neo-input-wrapper:focus-within .neo-input-icon {
        color: rgba(201, 168, 76, 0.7);
      }

      /* Error */
      .neo-error {
        display: none;
        padding: 0.875rem 1rem;
        background: rgba(231, 76, 60, 0.08);
        border: 1px solid rgba(231, 76, 60, 0.2);
        border-radius: 10px;
        color: #e74c3c;
        font-size: 0.875rem;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Submit button */
      .neo-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
        background-size: 200% 200%;
        border: none;
        border-radius: 12px;
        color: #050508;
        font-size: 0.9375rem;
        font-weight: 800;
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.05em;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 
          0 4px 20px rgba(201, 168, 76, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
        animation: btnShimmer 3s ease infinite;
        text-transform: uppercase;
      }

      @keyframes btnShimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .neo-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }

      .neo-btn:hover::before { left: 100%; }

      .neo-btn:hover {
        transform: translateY(-2px);
        box-shadow: 
          0 8px 30px rgba(201, 168, 76, 0.5),
          0 0 60px rgba(201, 168, 76, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }

      .neo-btn:active { transform: scale(0.98); }

      .neo-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      /* Divider */
      .neo-divider {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: rgba(255,255,255,0.15);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .neo-divider::before, .neo-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: rgba(201, 168, 76, 0.1);
      }

      /* Badge */
      .neo-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.625rem 1rem;
        background: rgba(201, 168, 76, 0.05);
        border: 1px solid rgba(201, 168, 76, 0.1);
        border-radius: 10px;
        color: rgba(201, 168, 76, 0.6);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .neo-badge-dot {
        width: 6px;
        height: 6px;
        background: #c9a84c;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(201, 168, 76, 0.8);
        animation: dotPulse 2s ease-in-out infinite;
      }

      @keyframes dotPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }

      /* Footer */
      .neo-footer {
        text-align: center;
        margin-top: 1.5rem;
        color: rgba(255,255,255,0.25);
        font-size: 0.8125rem;
      }

      .neo-footer a {
        color: rgba(201, 168, 76, 0.7);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.2s ease;
      }

      .neo-footer a:hover { color: #c9a84c; }

      /* University badge */
      .neo-university {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255,255,255,0.15);
        font-size: 0.6875rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        white-space: nowrap;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);

    // Create particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "neo-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDuration = Math.random() * 15 + 10 + "s";
      particle.style.animationDelay = Math.random() * 10 + "s";
      particle.style.width = Math.random() * 3 + 1 + "px";
      particle.style.height = particle.style.width;
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      this.container.appendChild(particle);
    }

    // Orbs
    [1, 2, 3].forEach((i) => {
      const orb = document.createElement("div");
      orb.className = `neo-orb neo-orb-${i}`;
      this.container.appendChild(orb);
    });

    // Card
    const card = document.createElement("div");
    card.className = "neo-card";

    card.innerHTML = `
      <div class="neo-logo">
        <div class="neo-logo-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
            <circle cx="6.5" cy="16.5" r="2.5"/>
            <circle cx="16.5" cy="16.5" r="2.5"/>
          </svg>
        </div>
        <h1 class="neo-title">NEO ParkFlow</h1>
        <p class="neo-subtitle">Sistema de Parqueadero Inteligente</p>
      </div>

      <form class="neo-form" id="neo-form">
        <div class="neo-field">
          <label class="neo-label">Usuario</label>
          <div class="neo-input-wrapper">
            <input 
              class="neo-input" 
              type="text" 
              id="neo-username"
              placeholder="Ingresa tu usuario"
              autocomplete="username"
            />
            <div class="neo-input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="neo-field">
          <label class="neo-label">Contraseña</label>
          <div class="neo-input-wrapper">
            <input 
              class="neo-input" 
              type="password" 
              id="neo-password"
              placeholder="Ingresa tu contraseña"
              autocomplete="current-password"
            />
            <div class="neo-input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="neo-error" id="neo-error"></div>

        <button class="neo-btn" type="submit" id="neo-submit">
          Iniciar Sesión
        </button>

        <div class="neo-divider">Sistema Seguro</div>

        <div class="neo-badge">
          <div class="neo-badge-dot"></div>
          Universidad de La Sabana — ParkFlow NEO v3.0
        </div>
      </form>
    `;

    this.container.appendChild(card);

    // University label
    const uni = document.createElement("div");
    uni.className = "neo-university";
    uni.textContent =
      "© 2026 Universidad de La Sabana — Diseño y Arquitectura de Software";
    this.container.appendChild(uni);

    // Form logic
    const form = card.querySelector("#neo-form") as HTMLFormElement;
    const errorDiv = card.querySelector("#neo-error") as HTMLDivElement;
    const submitBtn = card.querySelector("#neo-submit") as HTMLButtonElement;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = (card.querySelector("#neo-username") as HTMLInputElement)
        .value;
      const password = (card.querySelector("#neo-password") as HTMLInputElement)
        .value;

      if (!username || !password) {
        errorDiv.textContent = "Por favor completa todos los campos";
        errorDiv.style.display = "block";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Verificando...";
      errorDiv.style.display = "none";

      try {
        const user = await auth.login(username, password);
        const routes: Record<string, string> = {
          ATTENDANT: "/attendant/dashboard",
          USER: "/user/dashboard",
          ADMIN: "/admin/panel",
        };
        router.navigate(routes[user.role] || "/login");
      } catch (error) {
        errorDiv.textContent =
          error instanceof Error ? error.message : "Credenciales incorrectas";
        errorDiv.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.textContent = "Iniciar Sesión";
      }
    });

    return this.container;
  }
}

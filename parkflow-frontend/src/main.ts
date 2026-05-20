import { router } from "./router.js";

function createLoadingScreen(): HTMLDivElement {
  const loader = document.createElement("div");
  loader.id = "neo-loader";

  const style = document.createElement("style");
  style.textContent = `
    #neo-loader {
      position: fixed;
      inset: 0;
      background: #050508;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #neo-loader.fade-out { opacity: 0; pointer-events: none; }
    .loader-logo {
      width: 150px;
      height: 150px;
      opacity: 0;
      transform: scale(0.7);
      transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      filter: drop-shadow(0 0 40px rgba(201, 168, 76, 0.6));
    }
    .loader-logo.visible { opacity: 1; transform: scale(1); }
    .loader-title {
      font-family: 'Space Grotesk', 'Inter', sans-serif;
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      background: linear-gradient(135deg, #c9a84c, #f0d98a, #c9a84c);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 1.5rem;
      opacity: 0;
      transform: translateY(15px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
      animation: loaderShimmer 3s ease infinite;
    }
    .loader-title.visible { opacity: 1; transform: translateY(0); }
    @keyframes loaderShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .loader-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(201, 168, 76, 0.5);
      margin-top: 0.5rem;
      opacity: 0;
      transition: all 0.8s ease 0.7s;
    }
    .loader-subtitle.visible { opacity: 1; }
    .loader-bar-container {
      width: 220px;
      height: 2px;
      background: rgba(201, 168, 76, 0.1);
      margin-top: 2.5rem;
      border-radius: 2px;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.5s ease 0.8s;
    }
    .loader-bar-container.visible { opacity: 1; }
    .loader-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #c9a84c, #f0d98a, #c9a84c);
      background-size: 200% 200%;
      border-radius: 2px;
      transition: width 1.8s cubic-bezier(0.4, 0, 0.2, 1) 1s;
      box-shadow: 0 0 15px rgba(201, 168, 76, 0.8), 0 0 30px rgba(201, 168, 76, 0.4);
      animation: loaderShimmer 2s ease infinite;
    }
    .loader-bar.complete { width: 100%; }
    .loader-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(201, 168, 76, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201, 168, 76, 0.025) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }
    .loader-orb-1 {
      position: absolute;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201, 168, 76, 0.08), transparent 70%);
      top: -200px; right: -150px;
      pointer-events: none;
      animation: orbFloat 6s ease-in-out infinite;
    }
    .loader-orb-2 {
      position: absolute;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(74, 158, 255, 0.06), transparent 70%);
      bottom: -150px; left: -100px;
      pointer-events: none;
      animation: orbFloat 8s ease-in-out infinite reverse;
    }
    @keyframes orbFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }
    .loader-university {
      position: absolute;
      bottom: 2rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.625rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.2);
      opacity: 0;
      transition: opacity 0.8s ease 1.2s;
    }
    .loader-university.visible { opacity: 1; }
  `;
  document.head.appendChild(style);

  loader.innerHTML = `
    <div class="loader-grid"></div>
    <div class="loader-orb-1"></div>
    <div class="loader-orb-2"></div>
    <img class="loader-logo" src="/src/images/Parkflow.png" alt="NEO ParkFlow" />
    <div class="loader-title">NEO ParkFlow</div>
    <div class="loader-subtitle">Sistema de Parqueadero Inteligente</div>
    <div class="loader-bar-container">
      <div class="loader-bar"></div>
    </div>
    <div class="loader-university">Universidad de La Sabana — 2026</div>
  `;

  return loader;
}

function initLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = createLoadingScreen();
    document.body.appendChild(loader);

    setTimeout(
      () => loader.querySelector(".loader-logo")?.classList.add("visible"),
      100,
    );
    setTimeout(() => {
      loader.querySelector(".loader-title")?.classList.add("visible");
      loader.querySelector(".loader-subtitle")?.classList.add("visible");
    }, 500);
    setTimeout(() => {
      loader.querySelector(".loader-bar-container")?.classList.add("visible");
      loader.querySelector(".loader-university")?.classList.add("visible");
    }, 800);
    setTimeout(
      () => loader.querySelector(".loader-bar")?.classList.add("complete"),
      1000,
    );
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.remove();
        resolve();
      }, 800);
    }, 3200);
  });
}

function initMouseGlow(): void {
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

function initStaggerText(): void {
  document.querySelectorAll(".stagger-text").forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map(
        (char, i) =>
          `<span style="animation-delay: ${i * 0.04}s">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");
  });
}

function initCard3D(): void {
  function applyTilt(e: MouseEvent) {
    document.querySelectorAll(".card-3d").forEach((card) => {
      const el = card as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left - 100 ||
        e.clientX > rect.right + 100 ||
        e.clientY < rect.top - 100 ||
        e.clientY > rect.bottom + 100
      ) {
        el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        return;
      }
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  document.addEventListener("mousemove", applyTilt);
  document.addEventListener("mouseleave", () => {
    document.querySelectorAll(".card-3d").forEach((card) => {
      (card as HTMLElement).style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await initLoader();
  initMouseGlow();
  initStaggerText();
  initCard3D();
  router.init();
});

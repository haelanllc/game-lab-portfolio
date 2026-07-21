const state = {
  games: []
};

const accents = new Set(["sky", "lime", "coral", "gold", "violet"]);
const plusSessionKey = "game-lab-plus-access";
const plusCodeDigest = "0ce50d1ec89796bceb59a4b6b42fc7dace40993d719655b47070bb786b7a0f8d";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function statusClass(status = "") {
  const clean = status.toLowerCase();
  if (clean === "testing") return "status-testing";
  if (clean === "idea") return "status-idea";
  if (clean === "archive") return "status-archive";
  if (clean === "bonus") return "status-bonus";
  return "";
}

function isExternalUrl(value = "") {
  try {
    return new URL(value, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function externalAttrs(url = "") {
  return isExternalUrl(url) ? ' target="_blank" rel="noreferrer"' : "";
}

function playableUrl(game) {
  if (game.id !== "spine-laser-dino-duel") return game.playUrl;
  const url = new URL(game.playUrl, window.location.href);
  url.searchParams.set("v", "overworld3");
  return `${url.pathname}${url.search}`;
}

function normalizeAccent(accent = "sky") {
  return accents.has(accent) ? accent : "sky";
}

function generatedArt(game) {
  return `
    <div class="generated-art accent-${normalizeAccent(game.accent)}" aria-hidden="true">
      <span class="art-player"></span>
    </div>
  `;
}

function thumbnail(game) {
  if (game.image) {
    return `<img src="${escapeHtml(game.image)}" alt="">`;
  }
  return generatedArt(game);
}

function tagList(tags = []) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function learnedLabel(game) {
  return game.status?.toLowerCase() === "bonus" ? "Reference note" : "Design lesson";
}

function gameCard(game, compact = false) {
  const playUrl = playableUrl(game);
  const playAttrs = externalAttrs(playUrl);
  const code = game.codeUrl
    ? `<a class="button button-light" href="${escapeHtml(game.codeUrl)}" target="_blank" rel="noreferrer">Code</a>`
    : "";

  return `
    <article class="game-card accent-${normalizeAccent(game.accent)} ${compact ? "compact" : ""}">
      <a class="thumb" href="/game.html?id=${encodeURIComponent(game.id)}" aria-label="Open ${escapeHtml(game.title)}">
        ${thumbnail(game)}
      </a>
      <div class="card-topline">
        <h3>${escapeHtml(game.title)}</h3>
        <span class="status-pill ${statusClass(game.status)}">${escapeHtml(game.status)}</span>
      </div>
      <p>${escapeHtml(game.description)}</p>
      <div class="tag-row">${tagList(game.tags || [])}</div>
      <div class="card-actions">
        <a class="button button-dark" href="${escapeHtml(playUrl)}"${playAttrs}>
          <span class="play-icon" aria-hidden="true"></span>
          Play
        </a>
        ${code}
      </div>
    </article>
  `;
}

async function loadGames() {
  const response = await fetch("/games.json?v=wells-fargo-express-run", { cache: "reload" });
  if (!response.ok) throw new Error("Could not load games.json");
  state.games = await response.json();
  return state.games;
}

function renderHome() {
  const grid = document.querySelector("#game-grid");
  if (!grid) return;
  if (!state.games.length) {
    grid.innerHTML = `<div class="empty-state">No games have been added yet.</div>`;
    return;
  }
  grid.innerHTML = state.games.map((game) => gameCard(game)).join("");
}

function plusGames() {
  return state.games.filter((game) => game.status?.toLowerCase() !== "bonus");
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value.trim().toUpperCase());
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function setPlusAccess(unlocked) {
  const vault = document.querySelector("#plus-vault");
  const library = document.querySelector("#plus-library");
  const grid = document.querySelector("#plus-grid");
  const input = document.querySelector("#plus-code");
  const feedback = document.querySelector("#plus-feedback");
  if (!vault || !library || !grid) return;

  vault.hidden = unlocked;
  library.hidden = !unlocked;
  document.body.classList.toggle("plus-unlocked", unlocked);

  if (unlocked) {
    grid.innerHTML = plusGames().map((game) => gameCard(game)).join("");
    sessionStorage.setItem(plusSessionKey, "unlocked");
    document.querySelector("#plus-library-title")?.focus({ preventScroll: true });
  } else {
    grid.innerHTML = "";
    sessionStorage.removeItem(plusSessionKey);
    if (input) input.value = "";
    if (feedback) feedback.textContent = "Ask the Game Lab keeper for the code.";
    input?.focus({ preventScroll: true });
  }
}

function renderPlus() {
  const form = document.querySelector("#plus-form");
  const input = document.querySelector("#plus-code");
  const feedback = document.querySelector("#plus-feedback");
  const lock = document.querySelector("#plus-lock");
  if (!form || !input || !feedback || !lock) return;

  if (sessionStorage.getItem(plusSessionKey) === "unlocked") {
    setPlusAccess(true);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submittedCode = input.value;
    if (!submittedCode.trim()) {
      feedback.textContent = "Enter the access code first.";
      input.focus();
      return;
    }

    form.classList.add("is-checking");
    try {
      if (await digest(submittedCode) === plusCodeDigest) {
        feedback.textContent = "Access granted.";
        setPlusAccess(true);
      } else {
        feedback.textContent = "That code did not work. Try again.";
        input.select();
      }
    } catch {
      feedback.textContent = "This browser could not check the code.";
    } finally {
      form.classList.remove("is-checking");
    }
  });

  lock.addEventListener("click", () => setPlusAccess(false));
}

function renderDetail() {
  const detail = document.querySelector("#game-detail");
  if (!detail) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const game = state.games.find((item) => item.id === id) || state.games[0];

  if (!game) {
    detail.innerHTML = `<div class="empty-state">No games have been added yet.</div>`;
    return;
  }

  const code = game.codeUrl
    ? `<a class="button button-light" href="${escapeHtml(game.codeUrl)}" target="_blank" rel="noreferrer">Open code</a>`
    : "";
  const playUrl = playableUrl(game);
  const playAttrs = externalAttrs(playUrl);
  const external = isExternalUrl(playUrl);
  const playLabel = external ? "Open game" : "Full screen";
  const playPanel = external
    ? `
      <div class="play-panel external-play-panel">
        <div class="external-play-card">
          ${generatedArt(game)}
          <p>Open-source reference game</p>
        </div>
      </div>
    `
    : `
      <div class="play-panel">
        <div class="game-frame-wrap">
          <iframe class="game-frame" title="${escapeHtml(game.title)}" src="${escapeHtml(playUrl)}"></iframe>
        </div>
      </div>
    `;

  detail.innerHTML = `
    <section class="detail-layout accent-${normalizeAccent(game.accent)}">
      <div class="detail-panel">
        <p class="eyebrow">${escapeHtml(game.status)}</p>
        <h1>${escapeHtml(game.title)}</h1>
        <p>${escapeHtml(game.description)}</p>
        <div class="tag-row">${tagList(game.tags || [])}</div>
        ${game.learned ? `<div class="learned-box"><strong>${learnedLabel(game)}</strong>${escapeHtml(game.learned)}</div>` : ""}
        <div class="card-actions">
          <a class="button button-dark" href="${escapeHtml(playUrl)}"${playAttrs}>
            <span class="play-icon" aria-hidden="true"></span>
            ${playLabel}
          </a>
          ${code}
        </div>
      </div>
      ${playPanel}
    </section>
  `;
}

function formGame(form) {
  const data = new FormData(form);
  const title = data.get("title")?.toString().trim() || "Untitled Game";
  const id = slugify(data.get("id") || title);
  const tags = data
    .get("tags")
    ?.toString()
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) || [];

  return {
    id,
    title,
    description: data.get("description")?.toString().trim() || "A new browser game.",
    status: data.get("status")?.toString() || "Testing",
    playUrl: `/games/${id}/`,
    codeUrl: data.get("codeUrl")?.toString().trim() || "",
    image: "",
    tags,
    learned: data.get("learned")?.toString().trim() || "",
    accent: normalizeAccent(data.get("accent")?.toString() || "sky")
  };
}

function renderBuilder() {
  const form = document.querySelector("#game-form");
  const preview = document.querySelector("#card-preview");
  const output = document.querySelector("#json-output");
  const copy = document.querySelector("#copy-json");
  const download = document.querySelector("#download-json");
  if (!form || !preview || !output || !copy || !download) return;

  const draft = localStorage.getItem("game-lab-draft");
  if (draft) {
    try {
      const data = JSON.parse(draft);
      for (const [key, value] of Object.entries(data)) {
        if (form.elements[key]) form.elements[key].value = Array.isArray(value) ? value.join(", ") : value;
      }
    } catch {
      localStorage.removeItem("game-lab-draft");
    }
  }

  const titleInput = form.elements.title;
  const idInput = form.elements.id;

  titleInput.addEventListener("input", () => {
    if (!idInput.dataset.touched) idInput.value = slugify(titleInput.value);
  });
  idInput.addEventListener("input", () => {
    idInput.dataset.touched = "true";
    idInput.value = slugify(idInput.value);
  });

  function update() {
    const game = formGame(form);
    const json = JSON.stringify(game, null, 2);
    preview.innerHTML = gameCard(game, true);
    output.textContent = json;
    localStorage.setItem("game-lab-draft", JSON.stringify({
      title: game.title,
      id: game.id,
      description: game.description,
      status: game.status,
      accent: game.accent,
      codeUrl: game.codeUrl,
      tags: game.tags,
      learned: game.learned
    }));
    return { game, json };
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);

  copy.addEventListener("click", async () => {
    const { json } = update();
    await navigator.clipboard.writeText(json);
    copy.textContent = "Copied";
    setTimeout(() => {
      copy.textContent = "Copy JSON";
    }, 1400);
  });

  download.addEventListener("click", () => {
    const { game, json } = update();
    const blob = new Blob([json + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${game.id || "game"}-card.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  update();
}

async function boot() {
  const page = document.body.dataset.page;
  if (page === "home" || page === "detail" || page === "plus") {
    try {
      await loadGames();
      renderHome();
      renderDetail();
      renderPlus();
    } catch (error) {
      const target = document.querySelector("#game-grid") || document.querySelector("#game-detail") || document.querySelector("#plus-vault");
      if (target) target.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    }
  }
  if (page === "add") renderBuilder();
}

boot();

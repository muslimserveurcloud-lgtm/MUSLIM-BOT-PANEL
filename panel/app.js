const $ = (s) => document.querySelector(s);

function repoBase() {
  const host = location.hostname;
  const parts = location.pathname.split("/").filter(Boolean);
  if (host.endsWith(".github.io")) {
    return `https://github.com/${host.split(".")[0]}/${parts[0] || ""}`;
  }
  return "https://github.com";
}

function actionsUrl() {
  const base = repoBase();
  return base === "https://github.com" ? base : `${base}/actions`;
}

async function loadBots() {
  const box = $("#bots");
  try {
    const res = await fetch("bots.json", {cache:"no-store"});
    const bots = await res.json();
    $("#stats").innerHTML = `
      <div class="stat"><b>${bots.length}</b><span>Bots configurés</span></div>
      <div class="stat"><b>${bots.filter(b=>b.runtime==="node").length}</b><span>Node.js</span></div>
      <div class="stat"><b>${bots.filter(b=>b.runtime==="python").length}</b><span>Python</span></div>
    `;
    box.innerHTML = bots.map(bot => `
      <article class="bot">
        <div class="botTop">
          <div>
            <h3>${escapeHtml(bot.name)}</h3>
            <div class="muted">${escapeHtml(bot.id)} · ${escapeHtml(bot.runtime)}</div>
          </div>
          <span class="status">CONFIGURÉ</span>
        </div>
        <p class="muted"><code>${escapeHtml(bot.path)}</code></p>
        <div class="actions">
          <a class="btn primary" href="${actionsUrl()}" target="_blank" rel="noopener">▶ Ouvrir Actions</a>
          <button class="btn" onclick="copyText(${JSON.stringify(bot.id)})">Copier l'ID</button>
        </div>
      </article>
    `).join("");
  } catch(e) {
    box.innerHTML = `<div class="empty">Impossible de charger bots.json.</div>`;
  }
}

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

async function copyText(v) {
  try { await navigator.clipboard.writeText(v); alert("ID copié : " + v); }
  catch { alert(v); }
}

$("#actionsBtn").href = actionsUrl();
$("#refresh").addEventListener("click", loadBots);
loadBots();

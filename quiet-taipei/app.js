(function () {
  // 之後把 Google 表單網址貼在這裡；留空則顯示「準備中」
  var SHARE_FORM_URL = "";

  var KEY = "quiet-taipei-saved";
  var state = { mood: null, types: [], tags: [] };
  var saved = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
  }
  function byId(id) { return PLACES.filter(function (p) { return p.id === id; })[0]; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mapUrl(p) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.name + " 台北");
  }

  // ---------- 篩選 ----------
  function matches(p) {
    if (state.mood) {
      var m = MOODS.filter(function (x) { return x.id === state.mood; })[0];
      if (m.types.indexOf(p.type) === -1) return false;
      if (!m.tags.some(function (t) { return p.tags.indexOf(t) !== -1; })) return false;
    }
    if (state.types.length && state.types.indexOf(p.type) === -1) return false;
    if (state.tags.length && !state.tags.every(function (t) { return p.tags.indexOf(t) !== -1; })) return false;
    return true;
  }

  function makeChip(label, pressed, onClick) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = label;
    b.setAttribute("aria-pressed", pressed ? "true" : "false");
    b.addEventListener("click", onClick);
    return b;
  }
  function toggle(arr, v) {
    var i = arr.indexOf(v);
    if (i === -1) arr.push(v); else arr.splice(i, 1);
  }

  function renderFilters() {
    var moods = document.getElementById("moods"); moods.innerHTML = "";
    MOODS.forEach(function (m) {
      moods.appendChild(makeChip(m.label, state.mood === m.id, function () {
        state.mood = state.mood === m.id ? null : m.id; render();
      }));
    });
    var types = document.getElementById("typeFilters"); types.innerHTML = "";
    Object.keys(TYPES).forEach(function (k) {
      types.appendChild(makeChip(TYPES[k], state.types.indexOf(k) !== -1, function () {
        toggle(state.types, k); render();
      }));
    });
    var tags = document.getElementById("tagFilters"); tags.innerHTML = "";
    Object.keys(TAGS).forEach(function (k) {
      tags.appendChild(makeChip(TAGS[k], state.tags.indexOf(k) !== -1, function () {
        toggle(state.tags, k); render();
      }));
    });
  }

  // ---------- 卡片 ----------
  function cardHtml(p) {
    var on = saved.indexOf(p.id) !== -1;
    return '<article class="card">' +
      '<div class="card-top"><span class="meta">' + esc(TYPES[p.type]) + '・' + esc(p.area) + '</span></div>' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p>' + esc(p.tagline) + '</p>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(TAGS[t]) + '</span>'; }).join("") + '</div>' +
      '<div class="card-actions">' +
        '<button class="link-btn" data-open="' + p.id + '" type="button">看看怎麼去</button>' +
        '<button class="heart" data-save="' + p.id + '" type="button" aria-pressed="' + on + '" aria-label="' +
          (on ? "從清單移除" : "加入清單") + '：' + esc(p.name) + '">' + (on ? "♥" : "♡") + '</button>' +
      '</div></article>';
  }

  function render() {
    renderFilters();
    var list = PLACES.filter(matches);
    var grid = document.getElementById("grid");
    grid.innerHTML = list.length ? list.map(cardHtml).join("")
      : '<p class="empty">這個組合暫時沒有地方。放寬一點條件，或許會有新發現。</p>';
    document.getElementById("resultInfo").textContent = "共 " + list.length + " 個地方，慢慢看，不用急。";
    document.getElementById("savedCount").textContent = saved.length;
  }

  // ---------- 詳情 ----------
  function openDetail(id) {
    var p = byId(id); if (!p) return;
    var on = saved.indexOf(id) !== -1;
    var checked = p.status === "verified" && p.checked ? "最後確認：" + esc(p.checked) : "尚未實地確認，出發前請查官方資訊";
    var dlg = document.getElementById("detail");
    dlg.innerHTML = '<div class="dlg">' +
      '<button class="close" data-close aria-label="關閉">×</button>' +
      '<p class="meta">' + esc(TYPES[p.type]) + '・' + esc(p.area) + '・' + esc(p.cost) + '</p>' +
      '<h2 id="detailTitle">' + esc(p.name) + '</h2>' +
      '<p>' + esc(p.tagline) + '</p>' +
      '<div class="block"><h4>第一步怎麼走進去</h4><p>' + esc(p.firstStep) + '</p></div>' +
      '<div class="block"><h4>可以做些什麼</h4><ul>' + p.canDo.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div>' +
      '<div class="block"><h4>小提醒</h4><p>' + esc(p.note) + '</p></div>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(TAGS[t]) + '</span>'; }).join("") + '</div>' +
      '<div class="dlg-actions">' +
        '<a class="cta" href="' + mapUrl(p) + '" target="_blank" rel="noopener">在地圖開啟</a>' +
        '<button class="chip" data-save="' + id + '" type="button" aria-pressed="' + on + '">' + (on ? "已在清單 ♥" : "加入清單 ♡") + '</button>' +
      '</div>' +
      '<p class="small-note">' + checked + '</p></div>';
    dlg.setAttribute("aria-labelledby", "detailTitle");
    if (!dlg.open) dlg.showModal();
  }

  // ---------- 清單 ----------
  function renderSaved() {
    var box = document.getElementById("savedList");
    if (!saved.length) {
      box.innerHTML = '<p class="small-note">還沒有收藏。看到覺得「這裡應該可以」的地方，按一下愛心就好。</p>';
      return;
    }
    box.innerHTML = saved.map(byId).filter(Boolean).map(function (p) {
      return '<div class="saved-item"><div><strong>' + esc(p.name) + '</strong><br><span class="meta">' +
        esc(TYPES[p.type]) + '・' + esc(p.area) + '</span></div>' +
        '<div><button class="link-btn" data-open="' + p.id + '" type="button">看看</button> ' +
        '<button class="ghost" data-save="' + p.id + '" type="button">移除</button></div></div>';
    }).join("") + '<p class="small-note">清單只存在這個瀏覽器裡，不會上傳，也不需要註冊。</p>';
  }

  function toggleSave(id) {
    var i = saved.indexOf(id);
    if (i === -1) saved.push(id); else saved.splice(i, 1);
    persist(); render(); renderSaved();
    var d = document.getElementById("detail");
    if (d.open) openDetail(id);
  }

  // ---------- 事件 ----------
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open],[data-save],[data-close]");
    if (!t) { if (e.target.tagName === "DIALOG") e.target.close(); return; }
    if (t.hasAttribute("data-close")) { t.closest("dialog").close(); return; }
    if (t.hasAttribute("data-save")) { toggleSave(t.getAttribute("data-save")); return; }
    if (t.hasAttribute("data-open")) {
      document.getElementById("savedDialog").close();
      openDetail(t.getAttribute("data-open"));
    }
  });

  document.getElementById("openSaved").addEventListener("click", function () {
    renderSaved(); document.getElementById("savedDialog").showModal();
  });

  document.getElementById("randomBtn").addEventListener("click", function () {
    var list = PLACES.filter(matches);
    if (!list.length) list = PLACES;
    openDetail(list[Math.floor(Math.random() * list.length)].id);
  });

  var share = document.getElementById("shareLink");
  if (SHARE_FORM_URL) { share.href = SHARE_FORM_URL; }
  else {
    share.addEventListener("click", function (e) {
      e.preventDefault(); document.getElementById("shareHint").hidden = false;
    });
  }

  render();
})();

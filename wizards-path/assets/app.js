/* The Wizard's Path — shared behaviour. Vanilla JS, no dependencies.
   Everything degrades gracefully: with JS off, lessons still read fully. */
(function () {
  'use strict';

  /* ---------- safe storage ---------- */
  var mem = {};
  function get(k) { try { var v = window.localStorage.getItem(k); return v === null ? (mem[k] || null) : v; } catch (e) { return mem[k] || null; } }
  function set(k, v) { mem[k] = v; try { window.localStorage.setItem(k, v); } catch (e) { /* private mode: keep in memory */ } }
  function remove(k) { delete mem[k]; try { window.localStorage.removeItem(k); } catch (e) { /* private mode: clear in memory */ } }
  window.WP = { get: get, set: set, remove: remove };

  var ARCH = {
    storm:     { name: 'The Storm · Bhima',     line: 'Initiative, courage, momentum.' },
    fortress:  { name: 'The Fortress · Bhishma',  line: 'Solidity, patience, safety.' },
    architect: { name: 'The Architect · Drona', line: 'Plans, structure, long vision.' },
    fox:       { name: 'The Fox · Krishna\'s art',       line: 'Tactics, timing, counter-strike.' }
  };
  window.WP.ARCH = ARCH;

  /* ---------- boards from FEN ---------- */
  var GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
  function renderBoard(el) {
    var fen = el.getAttribute('data-fen');
    if (!fen) return;
    var parts = fen.split(' ');
    var rows = parts[0].split('/');
    if (rows.length !== 8) return;
    var flip = el.getAttribute('data-flip') === 'true';
    var cells = [];
    rows.forEach(function (row, r) {
      var f = 0;
      for (var i = 0; i < row.length; i++) {
        var ch = row[i];
        if (/\d/.test(ch)) { for (var n = 0; n < parseInt(ch, 10); n++) { cells.push({ r: r, f: f++, p: null }); } }
        else { cells.push({ r: r, f: f++, p: ch }); }
      }
    });
    if (cells.length !== 64) return;
    if (flip) cells.reverse();
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', el.getAttribute('data-label') || 'Chess position');
    var html = '';
    cells.forEach(function (c, idx) {
      var light = (c.r + c.f) % 2 === 0;
      var inner = '';
      if (c.p) {
        var white = c.p === c.p.toUpperCase();
        inner += '<span class="pc ' + (white ? 'w' : 'b') + '">' + GLYPH[c.p.toLowerCase()] + '︎</span>';
      }
      var col = idx % 8, row = Math.floor(idx / 8);
      if (col === 0) inner += '<span class="co r">' + (flip ? row + 1 : 8 - row) + '</span>';
      if (row === 7) inner += '<span class="co f">' + 'abcdefgh'[flip ? 7 - col : col] + '</span>';
      html += '<div class="sq ' + (light ? 'l' : 'd') + '">' + inner + '</div>';
    });
    el.innerHTML = html;
    var cap = el.parentNode && el.parentNode.querySelector('.boardcap');
    if (cap) {
      var side = parts[1] === 'b' ? 'Black' : 'White';
      var link = 'https://lichess.org/analysis/' + fen.replace(/ /g, '_');
      cap.innerHTML = side + ' to move · <a href="' + link + '" target="_blank" rel="noopener">open on an analysis board ↗</a>';
    }
  }
  function boards() {
    var list = document.querySelectorAll('.board[data-fen]');
    for (var i = 0; i < list.length; i++) renderBoard(list[i]);
  }

  /* ---------- archetype tabs ---------- */
  function initTabs() {
    var stored = get('wp_arch');
    var groups = document.querySelectorAll('[data-tabs]');
    for (var g = 0; g < groups.length; g++) (function (group) {
      var panels = group.querySelectorAll('.panel');
      if (!panels.length) return;
      var bar = document.createElement('div');
      bar.className = 'tab-bar';
      bar.setAttribute('role', 'tablist');
      var buttons = {};
      function show(key) {
        for (var i = 0; i < panels.length; i++) panels[i].hidden = panels[i].getAttribute('data-arch') !== key;
        for (var k in buttons) buttons[k].setAttribute('aria-selected', k === key ? 'true' : 'false');
      }
      Array.prototype.forEach.call(panels, function (p) {
        var key = p.getAttribute('data-arch');
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.innerHTML = '<span class="dot ' + key + '"></span>' + (ARCH[key] ? ARCH[key].name : key);
        b.addEventListener('click', function () { show(key); });
        buttons[key] = b;
        bar.appendChild(b);
      });
      group.insertBefore(bar, group.firstChild);
      show(stored && buttons[stored] ? stored : panels[0].getAttribute('data-arch'));
    })(groups[g]);
  }

  /* ---------- autosave fields ---------- */
  function initSave() {
    var list = document.querySelectorAll('[data-save]');
    for (var i = 0; i < list.length; i++) (function (el) {
      var key = 'wp_f_' + el.getAttribute('data-save');
      var v = get(key);
      if (v !== null) { if (el.type === 'checkbox') el.checked = v === '1'; else el.value = v; }
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', function () {
        set(key, el.type === 'checkbox' ? (el.checked ? '1' : '0') : el.value);
      });
    })(list[i]);
  }

  /* ---------- progress ---------- */
  function initProgress() {
    var n = document.body.getAttribute('data-lesson');
    var btn = document.querySelector('[data-complete]');
    if (n && btn) {
      var key = 'wp_done_' + n;
      var paint = function () {
        var d = get(key) === '1';
        btn.classList.toggle('done', d);
        btn.textContent = d ? '✓ Lesson complete' : 'Mark lesson complete';
      };
      paint();
      btn.addEventListener('click', function () { set(key, get(key) === '1' ? '0' : '1'); paint(); });
    }
    var cards = document.querySelectorAll('.card[data-lesson]');
    var done = 0;
    for (var i = 0; i < cards.length; i++) {
      var id = cards[i].getAttribute('data-lesson');
      var s = cards[i].querySelector('.status');
      if (get('wp_done_' + id) === '1') { cards[i].classList.add('is-done'); if (s) s.textContent = '✓ Complete'; done++; }
    }
    var fill = document.getElementById('progress-fill');
    var txt = document.getElementById('progress-text');
    if (fill && cards.length) fill.style.width = Math.round(100 * done / cards.length) + '%';
    if (txt && cards.length) txt.textContent = done + ' of ' + cards.length + ' lessons complete';
  }

  /* ---------- type badge ---------- */
  function initBadge() {
    var a = get('wp_arch');
    if (!a || !ARCH[a]) return;
    var nav = document.querySelector('.topbar');
    if (nav) {
      var s = document.createElement('span');
      s.className = 'mytype';
      s.textContent = ARCH[a].name;
      s.title = 'Your board personality (from Lesson 1)';
      nav.insertBefore(s, nav.querySelector('nav'));
    }
    var slot = document.getElementById('my-card');
    if (slot) {
      var b = get('wp_arch2');
      var edge = get('wp_edge');
      slot.hidden = false;
      slot.querySelector('[data-type]').textContent = ARCH[a].name + (b && ARCH[b] ? ' + ' + ARCH[b].name : '');
      slot.querySelector('[data-line]').textContent = ARCH[a].line + (edge ? ' Growth edge: ' + edge + '.' : '');
    }
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () { boards(); initTabs(); initSave(); initProgress(); initBadge(); });
})();

const DEFAULT_CATEGORIES = [
  { name: "Direct Equity",   current: 4.61,  target: 2.00  },
  { name: "Nifty 50",        current: 22.02, target: 28.50 },
  { name: "Nifty Next 50",   current: 8.39,  target: 10.00 },
  { name: "Mid Cap",         current: 6.97,  target: 8.00  },
  { name: "Small Cap",       current: 3.67,  target: 3.50  },
  { name: "Flexicap",        current: 2.45,  target: 3.00  },
  { name: "Global Equity",   current: 7.82,  target: 11.50 },
  { name: "Others",          current: 1.79,  target: 1.00  },
  { name: "Hybrid",          current: 10.86, target: 13.00 },
  { name: "Debt",            current: 28.23, target: 15.00 },
  { name: "Precious Metal",  current: 3.18,  target: 4.50  },
];

let categories = DEFAULT_CATEGORIES.map(c => ({ ...c }));
let mode = 'proportional';
let amount = 100000;
let editingIdx = null;   // row index whose lock amount is being edited
let editVal = 0;         // value shown in the open edit input
let editError = null;    // inline error message for a blocked save

const STEP = 5000;
const MIN_AMOUNT = 10000;
const LS_KEY = 'sip-rebalance-state';

function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify({ categories, mode, amount }));
}

(function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved && Array.isArray(saved.categories) && saved.categories.length > 0) {
      categories = saved.categories;
      if (saved.mode === 'proportional' || saved.mode === 'need') mode = saved.mode;
      if (typeof saved.amount === 'number' && saved.amount >= MIN_AMOUNT) amount = saved.amount;
    }
  } catch (e) { /* corrupted storage — use defaults */ }
})();

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function isLocked(c) { return typeof c.locked === 'number'; }
function sumLocked(exceptIdx) {
  return categories.reduce((a, c, i) => a + (isLocked(c) && i !== exceptIdx ? c.locked : 0), 0);
}

// --- Calculation ---
function computeAllocations() {
  const pool = Math.max(0, amount - sumLocked());
  const unlocked = categories.filter(c => !isLocked(c));
  const denomTarget = unlocked.reduce((a, c) => a + c.target, 0);
  const denomGap    = unlocked.reduce((a, c) => a + Math.max(0, c.target - c.current), 0);
  return categories.map(c => {
    const gap = c.target - c.current;
    let alloc;
    if (isLocked(c)) {
      alloc = c.locked;
    } else if (mode === 'need') {
      alloc = denomGap > 0 ? (Math.max(0, gap) / denomGap) * pool : 0;
    } else {
      alloc = denomTarget > 0 ? (c.target / denomTarget) * pool : 0;
    }
    return { ...c, gap, alloc: Math.round(alloc), locked: isLocked(c) };
  });
}

function getBadge(gap) {
  if (gap > 2)   return '<span class="badge badge-green">Underweight</span>';
  if (gap > 0)   return '<span class="badge badge-amber">Slightly under</span>';
  if (gap === 0) return '<span class="badge badge-neutral">On target</span>';
  if (gap > -2)  return '<span class="badge badge-amber">Slightly over</span>';
  return '<span class="badge badge-red">Overweight</span>';
}
function getBarColor(gap) {
  if (gap > 2)  return '#1D9E75';
  if (gap > 0)  return '#EF9F27';
  if (gap < -2) return '#E24B4A';
  return '#888780';
}

// --- Cell builders ---
function gapHtml(gap) {
  const color = gap > 0 ? 'var(--color-text-success)' : gap < 0 ? 'var(--color-text-danger)' : 'var(--color-text-secondary)';
  const sign  = gap > 0 ? '+' : '';
  return `<span style="color:${color};font-weight:500;">${sign}${gap.toFixed(2)}%</span>`;
}
function statusHtml(a) {
  const barPct = Math.round(Math.min(100, a.target > 0 ? (a.current / Math.max(a.current, a.target)) * 100 : 100));
  return `<div style="display:flex;align-items:center;gap:6px;">
      <div class="bar-wrap" style="flex:1;"><div class="bar-fill" style="width:${barPct}%;background:${getBarColor(a.gap)};"></div></div>
      ${getBadge(a.gap)}
    </div>`;
}
function investCellHtml(i, a, locked, editing) {
  if (editing) {
    return `<div class="invest-wrap">
        <input class="invest-input ${editError ? 'err' : ''}" type="number" min="0" step="1000" value="${editVal}" data-edit-idx="${i}">
        <span class="icon-btn"></span>
      </div>${editError ? `<div class="lock-err">${editError}</div>` : ''}`;
  }
  if (locked) {
    return `<div class="invest-wrap">
        <span class="invest-amt locked-amt">₹${a.alloc.toLocaleString('en-IN')}</span>
        <button class="icon-btn locked" data-lock-toggle="${i}" title="Locked — click to unlock">🔒</button>
      </div>`;
  }
  const color = a.alloc > 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)';
  return `<div class="invest-wrap">
      <span class="invest-amt" style="color:${color};">₹${a.alloc.toLocaleString('en-IN')}</span>
      <button class="icon-btn" data-edit="${i}" title="Lock an amount">✏️</button>
    </div>`;
}

// --- Rendering ---
function renderRows(allocs) {
  document.getElementById('allocBody').innerHTML = categories.map((c, i) => {
    const a = allocs[i];
    const locked = isLocked(c);
    return `<tr data-idx="${i}">
      <td><input type="text" data-field="name" value="${esc(c.name)}"></td>
      <td class="num"><input type="number" data-field="current" value="${c.current}" step="0.01" min="0" max="100"></td>
      <td class="num"><input type="number" data-field="target" value="${c.target}" step="0.01" min="0" max="100" ${locked ? 'disabled title="Unlock to edit target"' : ''}></td>
      <td class="num gap-cell">${gapHtml(a.gap)}</td>
      <td class="status-cell">${statusHtml(a)}</td>
      <td class="num invest-cell">${investCellHtml(i, a, locked, editingIdx === i)}</td>
      <td><button class="del-btn" title="Remove">×</button></td>
    </tr>`;
  }).join('');
}

function refreshSummary(allocs) {
  const under  = allocs.filter(c => c.gap > 0).length;
  const over   = allocs.filter(c => c.gap < 0).length;
  const maxGap = allocs.length ? Math.max(...allocs.map(c => Math.abs(c.gap))) : 0;
  document.getElementById('summaryCards').innerHTML = `
    <div class="metric-card"><p class="metric-label">Monthly amount</p><p class="metric-val">₹${amount.toLocaleString('en-IN')}</p></div>
    <div class="metric-card"><p class="metric-label">Underweight</p><p class="metric-val pos">${under}</p></div>
    <div class="metric-card"><p class="metric-label">Overweight</p><p class="metric-val neg">${over}</p></div>
    <div class="metric-card"><p class="metric-label">Biggest gap</p><p class="metric-val">${maxGap.toFixed(2)}%</p></div>
  `;
}
function refreshFooter(allocs) {
  const totalAlloc = allocs.reduce((a, c) => a + c.alloc, 0);
  document.getElementById('allocFoot').innerHTML = `
    <tr style="background:var(--color-background-secondary);">
      <td colspan="5" style="padding:8px;font-weight:500;font-size:14px;">Total allocated</td>
      <td class="num" style="padding:8px;font-weight:500;">
        <div class="invest-wrap"><span class="invest-amt">₹${totalAlloc.toLocaleString('en-IN')}</span><span class="icon-btn"></span></div>
      </td>
      <td></td>
    </tr>`;
}
function updateSumRow() {
  const sumCurrent = categories.reduce((a, c) => a + c.current, 0);
  const sumTarget  = categories.reduce((a, c) => a + c.target,  0);
  const cOk = Math.abs(sumCurrent - 100) < 0.01;
  const tOk = Math.abs(sumTarget  - 100) < 0.01;
  document.getElementById('sumRow').innerHTML = `
    <span class="sum-chip">Current total: <span class="sum-val ${cOk ? 'ok' : 'warn'}">${sumCurrent.toFixed(2)}%</span></span>
    <span style="color:var(--color-border-secondary)">|</span>
    <span class="sum-chip">Target total: <span class="sum-val ${tOk ? 'ok' : 'warn'}">${sumTarget.toFixed(2)}%</span></span>
    ${!cOk || !tOk ? '<span style="color:var(--color-text-warning);font-size:14px;">⚠ totals should sum to 100%</span>' : ''}
  `;
}
function updateModeNote() {
  const notes = {
    proportional: 'Proportional to target: the remaining budget (after locks) is split across unlocked categories by their target weights, including overweight ones.',
    need:         'Buy only underweight: the remaining budget (after locks) goes only to unlocked categories that are below target.'
  };
  document.getElementById('modeNote').textContent = notes[mode];
}

// Full rebuild — used on structural changes (lock/unlock, add, delete, mode, init)
function renderAll() {
  const allocs = computeAllocations();
  renderRows(allocs);
  refreshSummary(allocs);
  refreshFooter(allocs);
  updateSumRow();
  updateModeNote();
  if (editingIdx !== null) focusEditInput(editingIdx);
}

// Update derived cells only — preserves focus while typing in % / name inputs
function recalcDerived() {
  const allocs = computeAllocations();
  categories.forEach((c, i) => {
    const row = document.querySelector(`tr[data-idx="${i}"]`);
    if (!row) return;
    row.querySelector('.gap-cell').innerHTML = gapHtml(allocs[i].gap);
    row.querySelector('.status-cell').innerHTML = statusHtml(allocs[i]);
    if (editingIdx !== i) row.querySelector('.invest-cell').innerHTML = investCellHtml(i, allocs[i], isLocked(c), false);
  });
  refreshSummary(allocs);
  refreshFooter(allocs);
  updateSumRow();
}

function renderInvestCell(i) {
  const row = document.querySelector(`tr[data-idx="${i}"]`);
  if (!row) return;
  const allocs = computeAllocations();
  row.querySelector('.invest-cell').innerHTML = investCellHtml(i, allocs[i], isLocked(categories[i]), editingIdx === i);
}
function focusEditInput(i) {
  const inp = document.querySelector(`.invest-input[data-edit-idx="${i}"]`);
  if (inp) { inp.focus(); inp.select(); }
}

// --- Lock editing ---
function enterEdit(idx) {
  const allocs = computeAllocations();
  editingIdx = idx;
  editVal = allocs[idx].alloc;
  editError = null;
  renderInvestCell(idx);
  focusEditInput(idx);
}
function cancelEdit() {
  if (editingIdx === null) return;
  editingIdx = null;
  editError = null;
  renderAll();
}
function commitEdit(idx, raw) {
  if (editingIdx !== idx) return;
  const trimmed = String(raw).trim();
  if (trimmed === '') { cancelEdit(); return; }
  let val = Math.round(parseFloat(trimmed));
  if (isNaN(val) || val < 0) val = 0;
  const room = amount - sumLocked(idx);
  if (val > room) {
    editVal = val;
    editError = 'Max lockable here: ₹' + room.toLocaleString('en-IN');
    renderInvestCell(idx);
    focusEditInput(idx);
    return;
  }
  categories[idx].locked = val;
  editingIdx = null;
  editError = null;
  applySliderMin();
  saveState();
  renderAll();
}
function unlock(idx) {
  delete categories[idx].locked;
  editingIdx = null;
  editError = null;
  applySliderMin();
  saveState();
  renderAll();
}

// Slider can never dip below the total locked — keeps the budget from being overcommitted
function applySliderMin() {
  const slider = document.getElementById('amountSlider');
  const minLock = Math.max(MIN_AMOUNT, Math.ceil(sumLocked() / STEP) * STEP);
  slider.min = minLock;
  if (amount < minLock) {
    amount = minLock;
    slider.value = amount;
    document.getElementById('amountDisplay').textContent = '₹' + amount.toLocaleString('en-IN');
    saveState();
  }
}

// --- Events ---
document.getElementById('toggleRow').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-mode]');
  if (!btn) return;
  mode = btn.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  saveState();
  renderAll();
});

document.getElementById('amountSlider').addEventListener('input', function() {
  amount = parseInt(this.value);
  document.getElementById('amountDisplay').textContent = '₹' + amount.toLocaleString('en-IN');
  saveState();
  recalcDerived();
});

document.getElementById('addRowBtn').addEventListener('click', function() {
  categories.push({ name: 'New category', current: 0, target: 0 });
  saveState();
  renderAll();
});

const allocBody = document.getElementById('allocBody');

allocBody.addEventListener('input', function(e) {
  const el = e.target;
  if (el.classList.contains('invest-input')) return; // handled on commit
  const row = el.closest('tr');
  if (!row) return;
  const idx = parseInt(row.dataset.idx);
  if (el.dataset.field === 'name')    categories[idx].name    = el.value;
  if (el.dataset.field === 'current') categories[idx].current = parseFloat(el.value) || 0;
  if (el.dataset.field === 'target')  categories[idx].target  = parseFloat(el.value) || 0;
  saveState();
  recalcDerived();
});

allocBody.addEventListener('click', function(e) {
  const editBtn = e.target.closest('[data-edit]');
  if (editBtn) { enterEdit(parseInt(editBtn.dataset.edit)); return; }
  const lockBtn = e.target.closest('[data-lock-toggle]');
  if (lockBtn) { unlock(parseInt(lockBtn.dataset.lockToggle)); return; }
  const del = e.target.closest('.del-btn');
  if (del) {
    const idx = parseInt(del.closest('tr').dataset.idx);
    categories.splice(idx, 1);
    editingIdx = null;
    applySliderMin();
    saveState();
    renderAll();
  }
});

allocBody.addEventListener('keydown', function(e) {
  if (!e.target.classList.contains('invest-input')) return;
  if (e.key === 'Enter')  { e.preventDefault(); commitEdit(parseInt(e.target.dataset.editIdx), e.target.value); }
  else if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
});

allocBody.addEventListener('focusout', function(e) {
  if (!e.target.classList.contains('invest-input')) return;
  commitEdit(parseInt(e.target.dataset.editIdx), e.target.value);
});

// --- Init ---
document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
applySliderMin();
document.getElementById('amountSlider').value = amount;
document.getElementById('amountDisplay').textContent = '₹' + amount.toLocaleString('en-IN');
renderAll();

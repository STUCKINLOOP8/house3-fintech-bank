/**
 * IronVault Financial — Main Application Script
 * script.js | Platform UI v2.1
 * Author: frontend-platform@ironvault.io
 *
 * Responsibilities:
 *  - System initialization (session, cookies, theme)
 *  - Tab navigation
 *  - Transaction ledger rendering and search
 *  - Risk diagnostics engine (client-side)
 *  - Vault access control gate
 *  - Dark/Light theme toggle
 */

/* ============================================================
   GLOBAL STATE
   These variables track platform state across UI modules.
   isAdmin controls access to restricted vault content.
   The URL param ?clearance=admin can elevate this on load.
   ============================================================ */
var isAdmin = false;
window.isAdmin = false;

/* ============================================================
   SYSTEM INITIALIZATION
   Runs on DOMContentLoaded. Sets up session identifiers,
   cookies, theme, and URL-based access overrides.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  initSession();
  initTheme();
  checkClearanceParam();
  initNavigation();
  renderLedger(transactionData);
  updateLedgerCount(transactionData.length);
  consoleWelcome();
});

/**
 * initSession — Establishes client-side session markers.
 * Sets localStorage vault session key and account role cookie.
 * These are used by the platform analytics and access layer.
 */
function initSession() {
  localStorage.setItem("vault_session", "iv_sess_8f3d7021");
  document.cookie = "account_role=analyst_ro; path=/; SameSite=Lax";
}

/**
 * initTheme — Applies saved theme preference from localStorage.
 * Falls back to dark mode if no preference is stored.
 * Theme key: "ironvault_theme"
 */
function initTheme() {
  var savedTheme = localStorage.getItem("ironvault_theme") || "dark";
  applyTheme(savedTheme);
}

/**
 * applyTheme — Sets data-theme attribute on <html> and updates toggle label.
 * @param {string} theme — "dark" or "light"
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  var toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode";
  }
  localStorage.setItem("ironvault_theme", theme);
}

/**
 * toggleTheme — Flips between dark and light mode.
 * Bound to the theme toggle button in the topbar.
 */
function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
}

/**
 * checkClearanceParam — Reads ?clearance= from the URL query string.
 * If clearance=admin is present, sets isAdmin to true.
 * This supports officer-level access provisioning via direct link.
 */
function checkClearanceParam() {
  var params = new URLSearchParams(window.location.search);
  if (params.get("clearance") === "admin") {
    isAdmin = true;
    window.isAdmin = true;
  }
}

/**
 * consoleWelcome — Prints a styled init message to the browser console.
 * Useful for platform engineers verifying client-side boot sequence.
 */
function consoleWelcome() {
  console.log(
    "%c[ IronVault Financial ] Platform UI Initialized",
    "color: #3ddc68; background: #0a0d0a; font-size: 13px; padding: 6px 12px; border-left: 3px solid #3ddc68; font-family: monospace;"
  );
  console.log(
    "%c  Session: iv_sess_8f3d7021 | Role: analyst_ro | Build: v2.1.0",
    "color: #8aaa8a; font-size: 11px; font-family: monospace;"
  );
  console.log(
  "%cAudit Token: Sl33pyRa6hav",
  "color: #3ddc68; font-size: 14px; font-weight: bold; font-family: monospace;"
  );
}

/* ============================================================
   TAB NAVIGATION
   Manages switching between the 5 main dashboard panels.
   Each nav item corresponds to a tab-panel by data-tab attribute.
   ============================================================ */

/**
 * initNavigation — Attaches click handlers to sidebar nav items.
 * Activates the Overview tab by default on load.
 */
function initNavigation() {
  var navItems = document.querySelectorAll(".nav-item[data-tab]");
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var targetTab = item.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });
  // Default: show Overview tab
  switchTab("overview");
}

/**
 * switchTab — Deactivates all panels and activates the target one.
 * Also updates sidebar nav item active state.
 * @param {string} tabId — The data-tab value of the target panel
 */
function switchTab(tabId) {
  // Deactivate all tab panels
  var panels = document.querySelectorAll(".tab-panel");
  panels.forEach(function (panel) {
    panel.classList.remove("active");
  });

  // Deactivate all nav items
  var navItems = document.querySelectorAll(".nav-item[data-tab]");
  navItems.forEach(function (item) {
    item.classList.remove("active");
  });

  // Activate the selected panel
  var targetPanel = document.getElementById("tab-" + tabId);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  // Activate the matching nav item
  var targetNav = document.querySelector(".nav-item[data-tab='" + tabId + "']");
  if (targetNav) {
    targetNav.classList.add("active");
  }
}

/* ============================================================
   TRANSACTION LEDGER
   Renders transactionData from data.js into the ledger table.
   Search filters by account holder name or transaction type.
   Only 4 columns are rendered: TX ID, Account Holder, Type, Amount.
   Internal fields (currency, timestamp, compliance_flag) are not shown.
   ============================================================ */

/**
 * renderLedger — Clears and repopulates the ledger table body
 * with the provided array of transaction records.
 * @param {Array} records — Array of transaction objects from data.js
 */
function renderLedger(records) {
  var tbody = document.getElementById("ledger-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (records.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="table-empty">No transactions match your search.</td></tr>';
    return;
  }

  records.forEach(function (record) {
    var row = document.createElement("tr");

    // TX ID column
    var tdId = document.createElement("td");
    tdId.className = "mono";
    tdId.textContent = record.tx_id;

    // Account Holder column
    var tdHolder = document.createElement("td");
    tdHolder.textContent = record.account_holder;

    // Type column
    var tdType = document.createElement("td");
    tdType.textContent = record.type;

    // Amount column — rendered with accent styling
    var tdAmount = document.createElement("td");
    tdAmount.className = "amount";
    tdAmount.textContent = record.amount;

    row.appendChild(tdId);
    row.appendChild(tdHolder);
    row.appendChild(tdType);
    row.appendChild(tdAmount);

    tbody.appendChild(row);
  });
}

/**
 * updateLedgerCount — Updates the displayed record count label.
 * @param {number} count — Number of records currently shown
 */
function updateLedgerCount(count) {
  var countEl = document.getElementById("ledger-count");
  if (countEl) {
    countEl.textContent = count + " record" + (count !== 1 ? "s" : "");
  }
}

/**
 * onLedgerSearch — Event handler for the search input field.
 * Filters transactionData by account_holder or type fields,
 * then re-renders the table with the matching subset.
 */
function onLedgerSearch() {
  var input = document.getElementById("ledger-search");
  if (!input) return;

  var query = input.value.toLowerCase().trim();

  var filtered = transactionData.filter(function (record) {
    return (
      record.account_holder.toLowerCase().includes(query) ||
      record.type.toLowerCase().includes(query)
    );
  });

  renderLedger(filtered);
  updateLedgerCount(filtered.length);
}

/* ============================================================
   RISK DIAGNOSTICS ENGINE
   The "Run Risk Assessment" button triggers a simulated
   risk analysis cycle. Results are displayed in a metrics panel.
   A session token is written to sessionStorage on each run.
   ============================================================ */

/**
 * runRiskAssessment — Called when the user clicks "Run Risk Assessment".
 * Writes session token, displays loading state briefly, then shows results.
 */
function runRiskAssessment() {
  // Record this risk assessment session in sessionStorage.
  // Token format follows the internal risk engine convention: risk_tok_<hex>.
  sessionStorage.setItem("risk_session", "risk_tok_9c41b2");

  var btn = document.getElementById("risk-btn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⟳ Scanning...";
  }

  // Simulate a short scan delay before showing results
  setTimeout(function () {
    showRiskResults();
    if (btn) {
      btn.disabled = false;
      btn.textContent = "↺ Re-run Assessment";
    }
  }, 1400);
}

/**
 * showRiskResults — Populates and displays the risk metrics panel.
 * Values are deterministic mock outputs from the risk model.
 */
function showRiskResults() {
  // Populate individual metric fields
  var now = new Date();
  var scanTime = now.toLocaleTimeString("en-US", { hour12: false }) + " UTC";

  document.getElementById("risk-fraud-score").textContent = "0.07";
  document.getElementById("risk-anomaly-count").textContent = "3";
  document.getElementById("risk-compliance-rating").textContent = "A−";
  document.getElementById("risk-scan-time").textContent = scanTime;

  // Show the results panel, hide the idle state
  var resultsPanel = document.getElementById("risk-results");
  var idlePanel    = document.getElementById("risk-idle");
  if (resultsPanel) resultsPanel.classList.add("visible");
  if (idlePanel)    idlePanel.style.display = "none";
}

/* ============================================================
   VAULT ACCESS GATE
   Checks the global isAdmin flag before granting access.
   If false, shows a denial message.
   If true, injects the authorized vault content via innerHTML.
   The ?clearance=admin URL param sets isAdmin=true on load
   (handled in checkClearanceParam above).
   ============================================================ */

/**
 * authenticateVaultOfficer — Called on "Authenticate Vault Officer" click.
 * Grants or denies vault access based on the isAdmin flag.
 */
function authenticateVaultOfficer() {
  var resultBox = document.getElementById("vault-result");
  if (!resultBox) return;

  resultBox.classList.add("show");

  if (isAdmin === true || window.isAdmin === true) {
    // Access granted: inject restricted panel content
    var vaultKey = btoa("CSAM0C0nf3ss1ons");
    resultBox.className = "vault-result show granted";
    resultBox.innerHTML =
      '<strong>✔ Authorization Successful</strong><br>' +
      'Master Vault Token: <code style="color:var(--text-accent); font-weight:bold;">' + vaultKey + '</code><br>' +
      '<span style="font-size:11px; opacity:0.7;">Officer session established. Level 4 Clearance.</span>';

  } else {
    // Access denied: show generic denial without exposing variable names
    resultBox.className = "vault-result show denied";
    resultBox.innerHTML =
      '<strong>✖ Access Denied</strong><br>' +
      'Vault officer credentials required. Contact your compliance administrator.';
  }
}

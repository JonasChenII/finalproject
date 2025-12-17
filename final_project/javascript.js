"use strict";

// ===== Helpers =====
function setYear() {
  const yearSpan = document.getElementById("year"); // DOM query #1
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function setupCuisinePicker() {
  // Buttons on cuisines.html
  const pickButtons = document.querySelectorAll(".js-pick"); // DOM query #2
  const message = document.getElementById("choiceMessage");  // DOM query #3 (extra)

  if (!pickButtons.length) return;

  pickButtons.forEach((btn) => {
    btn.addEventListener("click", () => { // event-driven function
      const cuisine = btn.dataset.cuisine || "Cuisine";

      // Highlight: remove previous selected, add to current card
      document.querySelectorAll(".cuisine-card").forEach((card) => {
        card.classList.remove("is-selected");
      });

      const card = btn.closest(".cuisine-card");
      if (card) card.classList.add("is-selected"); // change CSS property via class

      // Update page content
      if (message) {
        message.textContent = `Selected: ${cuisine} ✅`;
      }
    });
  });
}

async function copyToClipboard(text) {
  // Prefer modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for non-secure contexts
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
}

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll(".js-copy"); // DOM query #4 (extra)
  if (!copyButtons.length) return;

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => { // event-driven function
      const address = btn.dataset.address;
      if (!address) return;

      const status = btn.parentElement?.querySelector(".copy-status");

      try {
        await copyToClipboard(address);

        // Update page content
        if (status) status.textContent = "Copied! ✅";
        btn.textContent = "Copied";

        // Reset after 2 seconds
        setTimeout(() => {
          if (status) status.textContent = "";
          btn.textContent = "Copy address";
        }, 2000);
          } catch (err) {
        if (status) status.textContent = "Copy blocked by browser. A copy box opened.";
          window.prompt("Copy this address:", address);
      }
    });
  });
}

// ===== Run on load =====
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setupCuisinePicker();
  setupCopyButtons();
});


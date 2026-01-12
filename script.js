// ================== CONFIG ==================
const API = "http://127.0.0.1:8000";
const userId = 1;

// ================== ELEMENTS ==================
const tapBtn = document.getElementById("tap-btn");
const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");

// ================== RENDER ==================
function render(data) {
  if (!data) return;

  balanceEl.innerText = data.balance.toFixed(2);
  energyEl.innerText = `${data.energy} / ${data.max_energy}`;
}

// ================== LOAD STATE ==================
async function loadState() {
  try {
    const res = await fetch(`${API}/state?user_id=${userId}`);
    const data = await res.json();
    render(data);
  } catch (e) {
    console.error("STATE ERROR", e);
  }
}

// ================== TAP ==================
tapBtn.onclick = async () => {
  try {
    const res = await fetch(`${API}/tap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    const data = await res.json();
    render(data);
  } catch (e) {
    console.error("TAP ERROR", e);
  }
};

// ================== UPGRADE TAP POWER ==================
async function upgradeTap() {
  try {
    const res = await fetch(`${API}/upgrade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    const data = await res.json();

    if (data.error) {
      alert("Not enough balance");
      return;
    }

    loadState();
  } catch (e) {
    console.error("UPGRADE TAP ERROR", e);
  }
}

// ================== UPGRADE MAX ENERGY ==================
async function upgradeEnergy() {
  try {
    const res = await fetch(`${API}/upgrade/max_energy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    const data = await res.json();

    if (data.error) {
      alert("Not enough balance");
      return;
    }

    render(data);
  } catch (e) {
    console.error("UPGRADE ENERGY ERROR", e);
  }
}

// ================== INIT ==================
loadState();

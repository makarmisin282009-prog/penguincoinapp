const tg = window.Telegram.WebApp;
tg.expand();

let balance = 0;
let energy = 100;
const maxEnergy = 100;

const balanceEl = document.getElementById("balance");
const energyFill = document.getElementById("energy-fill");
const energyText = document.getElementById("energy-text");
const tapBtn = document.getElementById("tap-btn");

function updateUI() {
  balanceEl.innerText = balance.toFixed(2);
  energyFill.style.width = (energy / maxEnergy * 100) + "%";
  energyText.innerText = `${energy} / ${maxEnergy}`;
}

tapBtn.onclick = () => {
  if (energy <= 0) return;
  balance += 0.01;
  energy -= 1;
  updateUI();
};

// LONG ENERGY REGEN (1 ENERGY / 5 SECONDS)
setInterval(() => {
  if (energy < maxEnergy) {
    energy += 1;
    updateUI();
  }
}, 5000);

// NAV
function openPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");
}

updateUI();

const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe?.user?.id || 1;

// ⚠️ ВАЖНО: поменяй URL, если backend на сервере
const API_URL = "http://127.0.0.1:8000";

const balanceEl = document.getElementById("balance");
const energyFill = document.getElementById("energy-fill");
const energyText = document.getElementById("energy-text");
const tapBtn = document.getElementById("tap-btn");

function updateUI(data) {
  balanceEl.innerText = data.balance.toFixed(2);
  energyFill.style.width = (data.energy / data.max_energy * 100) + "%";
  energyText.innerText = `${data.energy} / ${data.max_energy}`;
}

async function loadState() {
  const res = await fetch(`${API_URL}/state?user_id=${userId}`);
  const data = await res.json();
  updateUI(data);
}

tapBtn.onclick = async () => {
  const res = await fetch(`${API_URL}/tap`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ user_id: userId })
  });
  const data = await res.json();
  updateUI(data);
};

loadState();

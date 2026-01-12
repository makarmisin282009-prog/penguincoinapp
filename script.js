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

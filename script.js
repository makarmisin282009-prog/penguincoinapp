const API = "http://127.0.0.1:8000";
const userId = 1;

const tapBtn = document.getElementById("tap-btn");
const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");

function render(d) {
  balanceEl.innerText = d.balance.toFixed(2);
  energyEl.innerText = d.energy + "/" + d.max_energy;
}

async function load() {
  const r = await fetch(`${API}/state?user_id=${userId}`);
  render(await r.json());
}

tapBtn.onclick = async () => {
  const r = await fetch(`${API}/tap`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({user_id: userId})
  });
  render(await r.json());
};

async function upgrade() {
  await fetch(`${API}/upgrade`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({user_id: userId})
  });
  load();
}

load();

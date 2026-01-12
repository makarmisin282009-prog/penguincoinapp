const API = "http://127.0.0.1:8000";
const userId = 1;

const balance = document.getElementById("balance");
const energy = document.getElementById("energy");
const tapBtn = document.getElementById("tap-btn");
const topEl = document.getElementById("top");

function render(d){
  balance.innerText = d.balance.toFixed(2);
  energy.innerText = d.energy + "/" + d.max_energy;
}

async function load(){
  const r = await fetch(`${API}/state?user_id=${userId}`);
  render(await r.json());
}

tapBtn.onclick = async ()=>{
  const r = await fetch(`${API}/tap`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user_id:userId})
  });
  render(await r.json());
};

async function upgradeTap(){
  await fetch(`${API}/upgrade/tap`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user_id:userId})
  });
  load();
}

async function upgradeEnergy(){
  await fetch(`${API}/upgrade/energy`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user_id:userId})
  });
  load();
}

async function boost(){
  await fetch(`${API}/boost`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user_id:userId})
  });
}

async function loadTop(){
  const r = await fetch(`${API}/top`);
  const data = await r.json();
  topEl.innerHTML = "";
  data.forEach(u=>{
    topEl.innerHTML += `<li>${u.user}: ${u.balance.toFixed(2)}</li>`;
  });
}

load();

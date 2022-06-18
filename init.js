const username = document.getElementById("username");
const registerForm = document.getElementById("registerForm");
const logoutForm = document.getElementById("logoutForm");
const startSection = document.getElementById("start");
const profilSection = document.getElementById("profil");
const rewardSection = document.getElementById("reward");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const rewardImage = document.getElementById("imgReward");
const namaUser = document.getElementById("title");
const startNav = document.getElementById("startNav");
const rewardNav = document.getElementById("rewardNav");
const profilNav = document.getElementById("profilNav");
const startButton = document.getElementById("startButton");
const saveButton = document.getElementById("saveButton");
const registButton = document.getElementById("registButton");
const isiForm = document.getElementById("isi");

const player = new Player();
let default_option = ["😍", "😢", "😜"];
box1.textContent = default_option[0];
box2.textContent = default_option[1];
box3.textContent = default_option[2];

function dice() {
  box1.style.animation = "none";
  box2.style.animation = "none";
  box3.style.animation = "none";
  let gacha = [];
  for (let i = 0; i < default_option.length; i++) {
    const roll = default_option[~~(Math.random() * default_option.length)];

    setTimeout(function () {
      box1.style.animation = "spin-box1 1.5s forwards";
      box2.style.animation = "spin-box2 1.5s forwards";
      box3.style.animation = "spin-box3 1.5s forwards";
    }, 100);
    gacha.push(roll);
  }
  return gacha;
}

function reward() {
  rewardSection.style.display = "block";
  fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then((x) => x.json())
    .then((result) => {
      // Set nama reward
      let text = document.createElement("h1");
      text.textContent = result.name;

      // Set gambar hadiah
      let img = new Image(200, 200);
      img.src = result.image_link;

      // Set gambar hadiah
      rewardImage.appendChild(img);
      rewardImage.appendChild(text);
    });
}
// setInterval(() => {}, interval);

function loser() {
  document.getElementById("loser").style.display = "block";

  setTimeout(function () {
    document.getElementById("loser").style.display = "none";
  }, 2000);
}

function winner(box) {
  if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) {
    setTimeout(function () {
      swal({
        title: "SELAMAT ANDA MENANG",
        text: "Click OK Untuk Melihat Hadiah!",
        icon: "success",
      }).then((value) => {
        location.href = "#reward";
      });
      reward();
    }, 1000);
  } else {
    setTimeout(function () {
      loser();
    }, 1500);
  }
}

let playing = false;

let gaca = setInterval("false", rolling, 200);

function rolling() {
  const result = dice();
  box1.textContent = result[0];
  box2.textContent = result[1];
  box3.textContent = result[2];
}

function start() {
  startButton.innerHTML = "STOP";
  playing = true;

  gaca = setInterval(rolling, 200);
}
function stop() {
  startButton.innerHTML = "START";
  playing = false;
  clearInterval(gaca);
  winner();
}

startButton.onclick = function () {
  if (playing) {
    stop();
  } else {
    start();
  }
};

// Set token registrasi
function register() {
  player.username = username.value;
  player.register;
}

function logout() {
  player.logout;
}

// Mengambil data dari session
onload = function () {
  const token = sessionStorage.getItem("token");
  if (token && token != null) {
    const pecah = token.split("-");
    const nama = pecah[0];
    registerForm.style.display = "none";
    registButton.style.display = "none";
    namaUser.innerText = "Halo, " + nama;
    isiForm.value = nama;
  } else {
    registerForm.style.display = "block";
    logoutForm.style.display = "none";
    startNav.style.display = "none";
    startSection.style.display = "none";
    profilSection.style.display = "none";
    rewardSection.style.display = "none";
    rewardNav.style.display = "none";
    profilNav.style.display = "none";
  }
};

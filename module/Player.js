class Player {
  constructor() {
    this._username = "";
  }

  generateToken() {
    const random = ~~[Math.random() * 1000000];
    const token = this.username + "-" + random.toString();
    return token;
  }

  // setter method
  set username(_username) {
    return (this._username = _username);
  }

  // getter method
  get username() {
    return this._username;
  }

  get register() {
    sessionStorage.setItem("token", this.generateToken());
    registerForm.style.display = "none";
    registButton.style.display = "none";
    logoutForm.style.display = "block";
    namaUser.innerHTML = "Halo, " + this.username;
    startNav.style.display = "block";
    startSection.style.display = "block";
    profilSection.style.display = "block";
    rewardNav.style.display = "block";
    profilNav.style.display = "block";
    setTimeout(function () {
      location.href = "#start";
    }, 1000);
  }

  get logout() {
    sessionStorage.removeItem("token");
    location.reload();
    setTimeout(function () {
      location.href = "#home";
    }, 10);
  }
}

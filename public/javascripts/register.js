window.onload = function () {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const retype = document.getElementById("retype");
  const message = document.getElementById("message");

  const form = document.getElementById("fm-register");

  form.onsubmit = function () {
    alert("bc");
    if (email.innerHTML == "") {
      message.innerHTML = "Email can't be null";
      return false;
    }
    if (password.innerHTML == "") {
      message.innerHTML += "\npassword can't be null";
      return false;
    }
    if (password.innerHTML !== retype.innerHTML) {
      message.innerHTML += "\nRetype is wrong";
      return false;
    }
    return true;
  };
};

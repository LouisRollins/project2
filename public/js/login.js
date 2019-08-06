$(document).ready(function () {
  var loginForm = $(".login");
  var usernameInput = $("#usernameInput");
  var passwordInput = $("#passwordInput");

  loginForm.on("submit", function (status) {
    console.log("Submit Button Clicked.");
    status.preventDefault();
    var loginInfo = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(loginInfo.username);
    console.log(loginInfo.password);

    if (!loginInfo.username || !loginInfo.password) {
      alert("Fill Out The Required Fields");
      location.reload();
      return;
    }

    // run function to attempt a post with information pulled from inputs
    loginUser(loginInfo.username, loginInfo.password);
    console.log("loginUser was ran");
    usernameInput.val("");
    passwordInput.val("");
  });

  function loginUser(username, password) {
    $.post("/api/login", {
      // posts to api/login with creds
      username: username,
      password: password
    })
      .then(function () {
        // redirects to eventMaintenance if successful
        window.location.replace("/eventMaintenance");
      });
    // .catch(function (err) {
    //     console.log(err)
    // })
  }
});
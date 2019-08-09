$(document).ready(function () {
  var registerForm = $(".registerForm");
  var firstName = $("#firstNameInput");
  var lastName = $("#lastNameInput");
  var username = $("#usernameInput");
  var password = $("#passwordInput");
  var email = $("#emailInput");
  var passwordValidator = $("#passwordValidation");

  registerForm.on("submit", function (event) {
    console.log("Submit Button Clicked.");
    event.preventDefault();

    var validationOne = password.val().trim();
    var validationTwo = passwordValidator.val().trim();

    if (validationOne !== validationTwo) {
      alert("Passwords Do Not Match")
      return;
    }

    var newUser = {
      firstname: firstName.val().trim(),
      lastname: lastName.val().trim(),
      username: username.val().trim(),
      password: password.val().trim(),
      email: email.val().trim()
    };

    registerUser(newUser.username, newUser.password, newUser.email, newUser.firstname, newUser.lastname);

    firstName.val("");
    lastName.val("");
    username.val("");
    password.val("");
    email.val("");
  });

  function registerUser(username, password, email, firstname, lastname) {
    $.post("/api/register", {
      username: username,
      password: password,
      email: email,
      firstName: firstname,
      lastName: lastname
    }).then(function() {
      window.location.replace("/login");
    });
  }
});
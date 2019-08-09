$(document).ready(function () {
  var registerForm = $(".registerForm");
  var firstName = $("#firstNameInput");
  var lastName = $("#lastNameInput");
  var username = $("#usernameInput");
  var password = $("#passwordInput");
  var email = $("#emailInput");
  var passwordValidator = $("#passwordValidation");

  firstName.focus();

  registerForm.on("submit", function (event) {
    //console.log("Submit Button Clicked.");
    event.preventDefault();

    //Validation
    if(firstName.val() === null || firstName.val() === ""){
      alert("Please enter first name.");
      firstName.focus();
      return;
    }
    if(lastName.val() === null || lastName.val() === ""){
      alert("Please enter last name.");
      lastName.focus();
      return;
    }
    if(username.val() === null || username.val() === ""){
      alert("Please enter username.");
      username.focus();
      return;
    }
    if(password.val() === null || password.val() === ""){
      alert("Please enter a password.");
      password.focus();
      return;
    }

    var validationOne = password.val().trim();
    var validationTwo = passwordValidator.val().trim();

    if (validationOne !== validationTwo) {
      alert("Passwords Do Not Match");
      return;
    }
    if(email.val() === null || email.val() === ""){
      alert("Please enter your email address.");
      email.focus();
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
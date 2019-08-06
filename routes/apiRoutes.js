let db = require("../models");
let passport = require("passport");

module.exports = function (app) {
  // Post: Authenticate User
  app.post("/api/login",
    passport.authenticate("local",
    {
      successRedirect: "/eventMaintenance",
      failureRedirect: "/"
    }));
    // function (req, res) {
    //   console.log(req.user)
    //   res.json(req.user)
    // });

  // Post: Add New User
  app.post("/api/register", function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
      })
      .then(function () {
        res.redirect(307, "/login");
      }).catch(function (err) {
        res.status(401).json(err)
      })
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
  });

  // Post: New Event
  app.post("/api/eventMaintenance", function (req, res) {
    // console.log("Req.body:", req.body)
    // neeq req.body
    db.Events.create().then(function () {
      res.sendStatus(200);
    });
  });

  // Update: Event
  app.post("/api/eventMaint/:id", function (req, res) {
    // console.log("Req.params.id:", req.params.id)
    // need req.params
    // need req.body from Louis code
    db.Events.update().then(function () {
      res.sendStatus(200);
    });
  });
};
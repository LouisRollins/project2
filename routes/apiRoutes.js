let db = require("../models");
let passport = require("passport");

module.exports = function(app) {
  // Post: Authenticate User
  app.post("/api/login", function(req, res) {
    // console.log("Req.body:", req.body)
    passport.authenticate("local", {failureRedirect: "/login"}),
    function(req, res) {
      res.redirect("/eventMaint")
    }
  });

  // Post: Add New User
  app.post("/api/register", function(req, res) {
    db.Events.create().then(function() {
      res.sendStatus(200);
    });
  });

  // Post: New Event
  app.post("/api/eventMaint", function(req, res) {
    // console.log("Req.body:", req.body)
    // neeq req.body
    db.Events.create().then(function() {
      res.sendStatus(200);
    });
  });

  // Update: Event
  app.post("/api/eventMaint/:id", function(req, res) {
    // console.log("Req.params.id:", req.params.id)
    // need req.params
    // need req.body from Louis code
    db.Events.update().then(function() {
      res.sendStatus(200);
    });
  });
};

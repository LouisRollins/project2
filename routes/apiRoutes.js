let db = require("../models");
let passport = require("passport");

module.exports = function (app) {
  // Post: Authenticate User
  app.post("/api/login",
    passport.authenticate("local", {
      successRedirect: "/eventMaintenance",
      failureRedirect: "/"
    }));
  // function (req, res) {
  //   console.log(req.user)
  //   res.json(req.user)
  // });

  // Post: Add New User
  app.post("/api/register", function (req, res) {
    console.log(req.body)
    db.User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      .then(function () {
        res.send(200).end();
      }).catch(function (err) {
        res.status(401).json(err)
      })
  });

  // Logout of site
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
  });

  // Post: New Event
  app.post("/api/eventMaintenance", function (req, res) {
    // console.log("Req.body:", req.body)
    db.Events.create({
        eventName: req.body.eventName,
        eventDateTime: req.body.eventDateTime,
        lineup: req.body.lineup,
        cost: req.body.cost,
        ticketLink: req.body.ticketLink,
        posterLink: req.body.posterLink,
        VenueId: req.body.VenueId
      })
      .then(function () {
        res.send(200).end();
      }).catch(function (err) {
        res.status(401).json(err)
      })
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
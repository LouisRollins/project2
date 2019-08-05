var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Events.findAll({ include: [db.Venues] }).then(function (data) {

      res.render("index", {
        msg: "Welcome!",
        events: data
      });
    });
  });
  app.get("/daterange/:start/:end", function (req, res) {

    var start = req.params.start;
    var end = req.params.end;

    console.log(start);
    console.log(end);

    db.Events.findAll({ include: [db.Venues] }).then(function (data) {

      res.render("index", {
        msg: "Welcome!",
        events: data
      });
    });
  });

  app.get("/login", function (req, res) {
    res.render("logon");
  });

  app.get("/register", function (req, res) {
    res.render("register");
  });

  // Load example page and pass in an example by id
  app.get("/search/:id", function (req, res) {
    db.Events.findOne({ where: { id: req.params.id }, include: [db.Venues] }).then(function (dbSearch) {
      console.log(dbSearch);
      res.render("search", {
        msg:"search",
        events: dbSearch 
      });

    });
  });
  // Load example page and pass in an example by id
  app.get("/eventInfo/:id", function (req, res) {

    console.log("ID: " + req.params.id);

    db.Events.findOne({ where: { id: req.params.id }, include: [db.Venues] }).then(function (data) {

      res.json(data);

    });
  });

  //load eventMaintenance
  app.get("/eventMaintenance", function (req, res) {
    res.render("eventMaintenance");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


};

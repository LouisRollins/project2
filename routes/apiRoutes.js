var db = require("../models");

module.exports = function(app) {
  // Post: Authenticate User
  app.post("/api/login", function(req, res) {
    // console.log("Req.body:", req.body)
    db.Events.fineOne
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Post: Add New User
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Post: New Event
  app.post("/api/eventMaint", function(req, res) {
    // console.log("Req.body:", req.body)
    db.Events.create().then(function() {
      res.sendStatus(200);
    });
  });

  // Update: Event
  app.post("/api/eventMaint/:id", function(req, res) {
    // console.log("Req.params.id:", req.params.id)
    // need req.params from Louis code
    db.Events.update().then(function() {
      res.sendStatus(200);
    });
  });
};

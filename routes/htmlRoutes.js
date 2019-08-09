var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated")
var Op = require("sequelize").Op;

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find events that are from this date forward
    db.Events.findAll({
      include: [db.Venues],
      where: {
        eventDateTime: { [Op.gte]: today }
      },
      order: [["eventDateTime", "ASC"]]
    }).then(function (data) {

      for (var i = 0; i < data.length; i++) {
        data[i].shortDate = formatDate(data[i].eventDateTime, true);
      }

      res.render("index", {
        msg: "Welcome!",
        events: data
      });
    });
  });
  app.get("/daterange/:start/:end", function (req, res) {

    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    end.setDate(end.getDate() + 1);

    db.Events.findAll({
      include: [db.Venues],
      where: {
        eventDateTime: { [Op.between]: [start, end] }
      },
      order: [["eventDateTime", "ASC"]]
    }).then(function (data) {

      for (var i = 0; i < data.length; i++) {
        data[i].id = data[i].id.toString()
        data[i].shortDate = formatDate(data[i].eventDateTime, true);
      }

      res.render("partials/eventTablePartial", {
        layout: false,
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
    db.Events.findOne({ where: { id: req.params.id }, include: [db.Venues] }).then(function (data) {
      data.dataValues.shortDate = formatDate(data.eventDateTime, true);
      res.render("search", {
        msg: "search",
        events: data
      });

    });
  });
  // Load example page and pass in an example by id
  app.get("/eventInfo/:id", function (req, res) {

    console.log("ID: " + req.params.id);

    db.Events.findOne({ where: { id: req.params.id }, include: [db.Venues] }).then(function (data) {

      data.dataValues.shortDate = formatDate(data.eventDateTime, true);
      res.json(data);

    });
  });

  //load eventMaintenance
  app.get("/eventMaintenance", isAuthenticated, function (req, res) {
    db.Venues.findAll({order:[["venueName", "ASC"]]}).then(function(data){

    res.render("eventMaintenance", {
      venues: data
    })
  })

  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // This function formats the date and time for display
  function formatDate(date, includeTime) {
    var copy = new Date(Number(date));
    copy.setDate(date.getDate());
    var dd = copy.getDate();
    var mm = copy.getMonth() + 1;
    var yyyy = copy.getFullYear();

    if (dd.toString().length < 2) {
      dd = "0" + dd;
    }
    if (mm.toString().length < 2) {
      mm = "0" + mm;
    }

    if (includeTime === true) {
      var hh = copy.getHours() + 5;
      var nn = copy.getMinutes();
      var time = "";

      if (nn.toString().length < 2) {
        nn = "0" + nn;
      }
      if (hh > 12) {
        time = (hh - 13) + ":" + nn + " PM"
      } else {
        time = hh + ":" + nn + " AM"
      }

      copy = mm + "/" + dd + "/" + yyyy + " " + time;

    } else {
      copy = mm + "/" + dd + "/" + yyyy;
    }

    return copy;
  }

}

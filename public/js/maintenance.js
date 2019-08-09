$(document).ready(function () {
  var $maintenance = $(".eventMaintenance");
  var $eventName = $("#Event-Name-Input");
  var $lineup = $("#lineup-Input");
  var $date = $("#Date-Input");
  var $time= $("#time");
  var $cost = $("#cost-Input");
  var $ticketLink = $("#ticket-Link-Input");
  var $posterLink = $("#poster-link-Input");
  var $venue = $("#pal-select");
  var $img = $("#imgPoster");
       
  $eventName.focus();  

  $posterLink.on("change", function(){
    $img.attr("src",$posterLink.val());
  });
  
  $maintenance.on("submit", function (event) {
    //console.log("Submit Button Clicked.");
    event.preventDefault();
        
    var $dateTime= $date.val() + " " + $time.val();
    //console.log($date.val() + " " + $time.val());
    //console.log($dateTime);



    var newEvent = {
      eventName: $eventName.val().trim(),
      dateTime: $dateTime,
      lineup: $lineup.val().trim(),
      cost: $cost.val().trim(),
      ticket: $ticketLink.val().trim(),
      poster: $posterLink.val().trim(),
      venue: $venue.val()
    };

    console.log(newEvent.venue);

    addEvent(newEvent.eventName, newEvent.dateTime, newEvent.lineup, newEvent.cost, newEvent.ticket, newEvent.poster, newEvent.venue);
  });

  function addEvent(eventName, eventDateTime, lineup, cost, ticket, poster, venue) {
    $.post("/api/eventMaintenance", {
      eventName: eventName,
      eventDateTime: eventDateTime,
      lineup: lineup,
      cost: cost,
      ticketLink: ticket,
      posterLink: poster,
      VenueId: venue
    }).then(function () {
      window.location.replace("/");
    });
  }
});

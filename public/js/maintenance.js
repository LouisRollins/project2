var $eventName= $("#Event-Name-Input").val().trim();
var $lineup= $("#lineup-Input").val().trim();
var $dateTime= $("#Date-and-Time-Input").val().trim();
var $cost= $("#cost-Input").val().trim();
var $ticketLink= $("#ticket-Link-Input").val().trim();
var $posterLink= $("#poster-link-Input").val().trim();
var $addEvent= $("#addEvent").val().trim();

$addEvent.on("click", function(){
  addEvent();
});

function addEvent(eventName, eventDateTime, lineup, cost, ticketLink, posterLink){
  $.post("/api/maintenance", {
    eventName: $eventName,
    eventDateTime: $dateTime,
    lineup: $lineup,
    cost: $cost,
    ticketLink: $ticketLink,
    posterLink: $posterLink
  }).then(function(){
    window.location.reload("/index");
  });
}
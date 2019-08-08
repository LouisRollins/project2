$(document).ready(function () {
    var $maintenance = (".eventMaintenance");
    var $eventName = $("#Event-Name-Input");
    var $lineup = $("#lineup-Input");
    var $dateTime = $("#Date-and-Time-Input");
    var $cost = $("#cost-Input");
    var $ticketLink = $("#ticket-Link-Input");
    var $posterLink = $("#poster-link-Input");


    $maintenance.on("submit", function (event) {
        console.log("Submit Button Clicked.");
        event.preventDefault();

        var newEvent = {
            eventName: $eventName.val().trim(),
            dateTime: $dateTime.val().trim(),
            lineup: $lineup.val().trim(),
            cost: $cost.val().trim(),
            ticket: $ticketLink.val().trim(),
            poster: $posterLink.val().trim()
        }

        addEvent(newEvent.eventName, newEvent.dateTime, newEvent.lineup, newEvent.cost, newEvent.ticket, newEvent.poster);
    });

    function addEvent(eventName, eventDateTime, lineup, cost, ticket, poster) {
        $.post("/api/maintenance", {
            eventName: eventName,
            eventDateTime: eventDateTime,
            lineup: lineup,
            cost: cost,
            ticketLink: ticket,
            posterLink: poster
        }).then(function () {
            window.location.replace("/index");
        });
    }
});
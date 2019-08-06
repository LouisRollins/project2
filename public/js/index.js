// Get references to page elements
var $dateEnd = $("#end-date");
var $dateStart = $("#start-date");
var $modalBody = $(".modal-body");
//var $row = $(".js_row");

// Format date
function addDays(date, days) {
  var copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  var dd = copy.getDate();
  var mm = copy.getMonth() + 1;
  var yyyy = copy.getFullYear();
  
  if (dd.toString().length < 2) {
    dd = "0" + dd;
  }
  if (mm.toString().length < 2) {
    mm = "0" + mm;
  }

  copy = yyyy + "-" + mm + "-" + dd;

  return copy;
}

// Default search date on index
var today = new Date();
$dateStart.val(addDays(today, 0));
$dateStart.attr("min", addDays(today, 0));
$dateEnd.val(addDays(today, 10));
$dateEnd.attr("min", addDays(today, 0));

// Get data for record clicked on table
$("#event-table").on("click", function (e) {

  $.get("/eventInfo/" + e.target.parentElement.id).then(function (eventData) {

    // console.log(eventData);
   
    $("#event-title").text(eventData.eventName);
    
    // Build modal elements with api data
    $modalBody.empty();
    var $img = $("<img>");
    $img.attr("src", eventData.posterLink);
    $img.addClass("eventPoster");
    $img.appendTo($modalBody);

    var $ul = $("<ul>");
    $ul.addClass("eventUL");

    $ul = addLi($ul, eventData.shortDate);
    $ul = addLi($ul, eventData.lineup);
    $ul = addLi($ul, eventData.cost);

    if (eventData.ticketLink !== null && eventData.ticketLink !== "" && eventData.ticketLink !== "N/A") {
      var a = $("<a>");
      var $liLink = $("<li>");
      a.attr("href", eventData.ticketLink);
      a.attr("target", "_blank");
      a.text("CLICK FOR TICKETS");

      $liLink.append(a);
      $ul.append($liLink);
    }
    $ul= addLi($ul,"<strong>WHERE</strong>");
    $ul = addLi($ul, eventData.Venue.venueName);
    $ul = addLi($ul, eventData.Venue.address);

    var csz = eventData.Venue.city + ", " + eventData.Venue.state + " " + eventData.Venue.zip;

    $ul = addLi($ul, csz);
    $ul = addLi($ul, eventData.Venue.phoneNumber);
    $modalBody.append($ul);

    $("#event-modal").modal("show");
  });

  function addLi(ul, data) {
    var $li = $("<li>");
    $li.html(data);
    ul.append($li);
    return ul;
  }

});

$("#submit-btn").on("click",function(e){
  
  e.preventDefault();

  // Start Validtation
  if ($dateStart.val() > $dateEnd.val()){
    $("#event-title").text("Invalid Date Range");
    $modalBody.html("Invalid date range, please try again.");
    $("#event-modal").modal("show");
    return;
  } 

  var start = new Date($dateStart.val());  
  var today = new Date();

  if (start < today ){
    $("#event-title").text("Invalid Date Range");
    $modalBody.html("Please use current start dates only.");
    $("#event-modal").modal("show");
    return;
  } 
   
  // API returns partial with new recordset
  $.get("/daterange/" + $dateStart.val() + "/" + $dateEnd.val()).then(function(data){

    $("#event-table").empty();
    $("#event-table").append(data);
    
  });
});

//needed for background carousel - Louis 
$(".carousel").carousel({ pause: false });

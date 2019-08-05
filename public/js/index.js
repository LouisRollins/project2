// Get references to page elements
var $dateEnd = $("#end-date");
var $dateStart = $("#start-date");
var $modalBody = $(".modal-body");
var $row = $(".js_row");

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

var today = new Date();
$dateStart.val(addDays(today, 0));
$dateStart.attr("min", addDays(today, 0));
$dateEnd.val(addDays(today, 10));
$dateEnd.attr("min", addDays(today, 0));

$row.on("click", function () {

  $.get("/eventInfo/" + this.id).then(function (eventData) {

    //console.log(eventData);

    $("#event-title").text(eventData.eventName);
    $("#event-modal").modal("show");

    $modalBody.empty();
    var $img = $("<img>");
    $img.attr("src", eventData.posterLink);
    $img.addClass("eventPoster");
    $img.appendTo($modalBody);

    var $ul = $("<ul>");
    $ul.addClass("eventUL");

    $ul = addLi($ul, eventData.eventDateTime);
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
 
  $.get("/daterange/" + $dateStart.val() + "/" + $dateEnd.val()).then(function(){
    console.log("done");
  });

});

//needed for background carousel - Louis 
$(".carousel").carousel({ pause: false });


/////////////// ORIGINAL DEFAULT CODE BELOW - MAY BE DELETED LATER!! /////////////
// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

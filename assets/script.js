var topicArray = [
  "cats",
  "dogs",
  "hamsters",
  "elephants",
  "lions",
  "otters",
  "penguins",
  "dolphines",
  "chimpanzee",
  "tigers"
]




function renderButtons() {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the topicArray
  for (var i = 0; i < topicArray.length; i++) {

    // Then dynamicaly generating buttons for each element in the array
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("topic-btn");
    // Adding a data-attribute
    a.attr("data-name", topicArray[i]);
    // Providing the initial button text
    a.text(topicArray[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }

  // Clear form field
  $("#topic-input").val("");
}


// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding movie from the textbox to our array
  topicArray.push(topic);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic-btn" and run function getGifData.
$(document).on("click", ".topic-btn", getGifData);

renderButtons();


//
function getGifData() {
  var apiKey = "MN08vNLmzxtFxXN0eMcJ2G3MeikVafP2"
  var gifLimit = 10;
  var topic  = $(this).attr("data-name")
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  topic + "&api_key=" + apiKey + "&limit=" + gifLimit;


   // Performing an AJAX request with the queryURL
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  // After data comes back from the request
  .then(function(response) {

    console.log(response);
    // storing the data from the AJAX request in the gifData variable
    var gifs = response.data;
    gifs.forEach(displayGif);
  });

  // empty #gifs div
  $("#gifs").empty();
};

//
function displayGif(gifData) {
  
  

  var $div = $('<div>');
  $div.addClass('col-12 col-sm-4 mb-4');

  var $card = $('<div>');
  $card.addClass('card h-100');

  var $cardBody = $('<div>').addClass('card-body d-flex flex-column');

  $("<img>")
    .addClass('card-img-top gif')
    .attr("src", gifData.images.fixed_width_still.url)
    .attr("data-state", "still")
    .attr("data-still", gifData.images.fixed_width_still.url)
    .attr("data-animate", gifData.images.fixed_width.url)
    .appendTo($cardBody)

  $('<p>')
    .addClass('card-text')
    .text(gifData.rating)
    .appendTo($cardBody);

  $cardBody.appendTo($card);
  $card.appendTo($div);

  $('#gifs').append($div);
};


$(document).on("click", ".gif", animateGif);

function animateGif() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};

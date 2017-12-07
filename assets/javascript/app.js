$(document).ready(function() {
    // Starter items that are initially displayed after loading the page
    var starterItems = ["Darth Vader", "Thor", "Batman", "Luke Skywalker", "Superman", "Iron Man", "Hulk", "Aquaman", "Rey", "Kylo Renn"];
    console.log(starterItems);
    // Function to display startItems as buttons
    function displayButtons() {
        // Empty anything that might be there to avoid duplicates
        $("#gifBtnDisplay").empty();
        for (var i = 0; i < starterItems.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("btn btn-success btn-lg");
            gifBtn.attr("data-name", starterItems[i]);
            gifBtn.text(starterItems[i]);
            $("#gifBtnDisplay").prepend(gifBtn);
        }
    }
    // Function to add a new item button
    function addNewButton() {
        $("#addNewGif").on("click", function() {
            var newItem = $("#inputLarge").val().trim();
          	// Prevent user from adding blank button
            if (newItem == "") {
                return false; 
            }
            starterItems.push(newItem);
            console.log(starterItems);

            displayButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var item = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=HYCdJ50ZyaNW8DSRW0IfTD10ovnLxp8W&limit=10";
        // Console log to make sure its completing the queryUrl with the search item
        console.log(queryURL); 
        $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
            	// console log to make sure the JSON object returns
                console.log(response); 
                // erasing anything in this div so that it doesnt keep any gifs from the previous click
                $("#gifDisplay").empty(); 
                //shows results of gifs
                var results = response.data; 
                if (results == "") {
                	// if no results alert saying so
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {
					// new div for the gifs to go inside
                    var gifDiv = $("<div>"); 
                    gifDiv.addClass("gifDiv");
                    // get rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // get gif image
                    var gifImage = $("<img>");
                    // still image stored into src of image
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                    // still image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                    // animated image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                    // set the image state
                    gifImage.attr("data-state", "still"); 
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // adding div of gifs to gifsView div
                    $("#gifDisplay").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    // Call back to display list of starterItem buttons
    displayButtons(); 
    addNewButton();
    // Document Event Listeners
    $(document).on("click", ".btn-success", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
var topics = ["Drake", "Lil Wayne", "Migos", "Future", "French Montana", "Swae Lee", "Eminem", "21 Savage", "Young Thug", "Lil Yachty", "Lil Uzi Vert", "Travis Scott", "Gucci Mane", "Wiz Khalifa", "Snoop Dogg"]


function renderButtons() {


    $("#rapButton").empty();


    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");

        a.addClass("artist btn btn-outline-primary");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);

        $("#rapButton").append(a);
    }
}

renderButtons()

$("#add-artist").on("click", function (event) {


    event.preventDefault();


    var artist = $("#artist-input").val().trim();

    if (artist === "") {
        return artist
    }

    else {

        topics.push(artist);
    }


    renderButtons();
});



function displayMovieInfo() {

    console.log("working")


    $("#gifs").empty();

    var artistName = $(this).attr("data-name");
    console.log(artistName)
    var apiKey = "AQuJkP3ytJgzdpJpDCOMrZi17lYMobOt"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artistName + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        var result = response.data
        for (var i = 0; i < result.length; i++) {


            var $gif = $("<div>");
            var p = $("<p>").text("Rating: " + result[i].rating);
            p.addClass("ratings")
            var gifImage = $("<img>");
            gifImage.addClass("gifs")
            gifImage.attr("src", result[i].images.fixed_height_still.url);
            gifImage.attr("data-still", result[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", result[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            $gif.append(p);
            $gif.append(gifImage);
            $("#gifs").append($gif);
        }

        $(".gifs").on("click", function () {
          
            var state = $(this).attr("data-state");
            
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    });

}

$(document).on("click", ".artist", displayMovieInfo);

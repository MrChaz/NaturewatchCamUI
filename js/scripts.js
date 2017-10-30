var controllingMin = 1;
$(document).ready(function() {

    // Check if camera feed is available.
    $.get("python/feed.mjpg")
        .done(function() {
            console.log("Camera feed is available.");
        }).fail(function() {
            $("#feed").empty();
            $("#feed").append('<img src="assets/unavailable.jpg">');
        });

    // Hide controls
    $("#sensitivity-controls").hide();
    $("#delete-confirm").hide();
    $("#delete-confirm2").hide();

    sendGetRequest("default");

    // Button events
    $(".btn").click(function() {
        var dataDest = $(this).data('dest');
        var thisButton = $(this);
        console.log(dataDest);
        if (dataDest == "sensitivity") {
            $("#sensitivity-controls").slideDown(100);
        }
        else if (dataDest == "less") {
            $("#sensitivity-controls .active").removeClass("active").
            thisButton.addClass("active");
        }
        else if (dataDest == "start") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to start capture.");
                },
                success: function() {
                    console.log("Started capture");
                    thisButton.data('dest', "stop");
                    thisButton.addClass("btn-danger");
                    thisButton.removeClass("btn-success");
                    thisButton.text("Stop recording");
                },
                timeout: 1000
            });
        }
        else if (dataDest == "stop") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to start capture.");
                },
                success: function() {
                    console.log("Stopped capture");
                    thisButton.data('dest', "start");
                    thisButton.addClass("btn-success");
                    thisButton.removeClass("btn-danger");
                    thisButton.text("Start recording");
                },
                timeout: 1000
            });
        }
        else if (dataDest == "delete") {
            $("#delete-confirm").slideDown(100);
        }
        else if (dataDest == "delete-yes") {
            $("#delete-confirm2").slideDown(100);
        }
        else if (dataDest == "delete-no") {
            $("#delete-confirm").slideUp(100);
            $("#delete-confirm2").slideUp(100);
        }
        else if (dataDest == "delete-final") {
            $.ajax({
                url: "python/" + dataDest,
                error: function() {
                    console.log("Failed to delete photos.");
                },
                success: function() {
                    console.log("Deleted photos.");
                    location.reload(true);
                },
                timeout:1000
            });
        }
        else sendGetRequest(dataDest);
    });
});

function sendGetRequest(r) {
    $.get("python/" + r)
        .done(function() {
            console.log("Sent get request to " + r);
            return true;
        }).fail(function() {
            console.log("Failed to send get request.");
            return false;
        });

}

function toggle_mobile_menu() {
    ($("#primary_navigation_mobile").hasClass("active") ? hide_mobile_menu : show_mobile_menu)()
}
function show_mobile_menu() {
    $(".modal").modal("hide"),
    $("#toggle_navigation").addClass("active"),
    $("#overlay").fadeIn("fast", function() {
        $("#primary_navigation_mobile").animate({
            left: 0
        }, 200, function() {
            $("#primary_navigation_mobile").addClass("active")
        })
    })
}
function hide_mobile_menu() {
    $("#toggle_navigation").removeClass("active"),
    $("#primary_navigation_mobile").animate({
        left: -340
    }, 200, function() {
        $("#primary_navigation_mobile").css({
            left: ""
        }).removeClass("active"),
        $("#overlay").fadeOut("fast")
    })
}
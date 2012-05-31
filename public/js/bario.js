
canvas = $('<canvas id="canvas" width="640" height="480" style="position:absolute; left: 434px; top: 1950px; z-index: 1000;"></canvas>');

var engine;

$(document).ready(function() {
  $("a#bario").click(function (e) {
    e.preventDefault();
    $("#main").append(canvas);

    engine = new Enjine.Application();
    engine.Initialize(new Mario.LoadingState(), 320, 240);

    canvas.slideDown("slow", function () {
      $("html, body").animate({ scrollTop: canvas.offset().top + "px"}, 500)
    });
    key.setScope("mario");
  });
});

key("escape", "mario", function () {
  $("#canvas").slideUp("slow", function () {
    key.setScope("all");
    $("#canvas").remove();
    engine.timer.Stop();
  });
});


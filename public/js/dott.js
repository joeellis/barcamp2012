$(document).ready(function() {
  $("#dott-img").click(function () {
    var snd = new Audio("../sounds/sound-dott.mp3"); // buffers automatically when created
    snd.play();
    // $("#sound-dott").get(0).play();
  });
});

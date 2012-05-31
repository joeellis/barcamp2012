$(document).ready(function(){
  moveHeli();
  setInterval(moveHeli, 3000);
});

function moveHeli() {
  var self = this;
  width = $(window).outerWidth();
  $(".helicopter").animate({right:width}, 3000, function() {
    $(this).css("right", 0);
  });
}
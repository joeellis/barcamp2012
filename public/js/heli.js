$(document).ready(function(){
  $(".helicopter").each(function(index, element) {
    right = $(element).clone().css("right").replace("px","");
    moveHeli($(element), right);
  });
});

function moveHeli($element, $right) {
  var self = this;
  width = $(window).outerWidth();

  $element.animate({right:width + 3000}, 27000, function() {
    $element.css("right", $right);
    moveHeli($element, $right);
  });
}
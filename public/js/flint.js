
iFrame = $('<iframe id="flintFrame" width="900" height="1000" style="position:absolute; left: 255px; top: 1700px; z-index: 1000;" scrolling="no" frameborder="0" src="http://web.ist.utl.pt/~antonio.afonso/agi/"></iframe>');

$(document).ready(function() {
  $("a#flint").click(function (e) {
    e.preventDefault();
    $("#main").append(iFrame);
    iFrame.slideDown("slow");
    key.setScope("flint");
  });
});

key("escape", "flint", function () {
  $("#flintFrame").slideUp("slow", function () {
    key.setScope("all");
    $("#flintFrame").remove();
  });
});


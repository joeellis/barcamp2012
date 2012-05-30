$(function() {
  var $panes = $("<div>").attr("id", "windowPanes").appendTo($("body"));
  var rows = 22;
  var cols = 7;
  for(var r = 0; r < 22; r++) {
    $row = $("<div>").addClass("row row"+r);
    $panes.append($row);
    for(var c = 0; c < cols; c++) {
      $col = $("<div>").attr("id", "pane-"+r+"-"+c).addClass("pane col"+c);
      $row.append($col);
    }
  }
  $("#paneContents").children().each(function(i, el) {
    $el = $(el);
    var paneId = null;
    if(paneId = $el.data("pane-id")) {
      $el.detach().appendTo($("#"+paneId));
    }
  });
});

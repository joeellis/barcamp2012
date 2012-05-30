var rows = 22;
var left_windows = 3;
var right_windows = 4;

var top_offset = 854;
var left_offset = 418;
var right_offset = 700;
var height = 116;
var left_width = 88;
var right_width = 85;

var template = "<div class='window'>&nbsp;</div>";

$(document).ready(function(){

  for (var i = 0; i < rows; i++) {
    go_left = left_offset;
    go_right = right_offset;
    
    for (var l = 0; l < left_windows; l++){
      window_template = $(template)
        .css('top',top_offset)
        .css('left',go_left)
        .css('height', height)
        .css('width', left_width)
        .addClass("row" + (i+1))
        .addClass("col" + (l+1));
      go_left += left_width;
      $('body').append(window_template);
    }
    
    for (var r = 0; r < right_windows; r++){
      window_template = $(template)
        .css('top',top_offset)
        .css('left',go_right)
        .css('height', height)
        .css('width', right_width)
        .addClass("row" + (i+1))
        .addClass("col" + (r+4));
      go_right += right_width;
      $('body').append(window_template);
    }
    
    top_offset += height;
    
    
  }
  

});


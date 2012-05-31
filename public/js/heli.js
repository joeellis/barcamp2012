$(document).ready(function () {
  var maxY     = 700;
  var minY     = 50;
  var minX     = 200;
  var maxX     = 1200;

  $(".helicopter").each(function (idx, el) {
    var el = $(el);
    var fn = function () {
      var interval = 800 * Math.random() + 500;
      var radius   = 120 * Math.random() + 50;
      var offset = el.offset();
      var rand = Math.random();
      var angle = rand*2*3.1418;
      var top  = Math.max(minY, Math.min(maxY, offset.top + Math.cos(angle)*radius));
      var left = Math.max(minX, Math.min(maxX, offset.left + Math.sin(angle)*radius));
      var properties = {
        top  : top,
        left : left
      };
      var css = {};
      if (offset.left < left) {
        css.transform = "scaleX(-1)";
        css["-webkit-transform"] = "scaleX(-1)";
        css["-moz-transform"] = "scaleX(-1)";
        css["-o-transform"] = "scaleX(-1)";
        css.filter = "flipH";
      } else {
        css.transform = "";
        css["-webkit-transform"] = "";
        css["-moz-transform"] = "";
        css["-o-transform"] = "";
        css.filter = "";
      }
      el.css(css);
      el.animate(properties, interval, fn);
    };
    fn();
  });
});

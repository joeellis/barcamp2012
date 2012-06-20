(function() {
  $.fn.pullBlinds = function(opts) {
    var up, down, wrapper, direction;

    if ( !$(this).parent().hasClass('blinds-wrap') ) {
      $(this).wrap('<div class="blinds-wrap down" />');
    }

    wrapper = $(this).closest('.blinds-wrap');
   
    up = function() {
      wrapper.stop(true,false).animate({'height':'50%'}, 300);
    };
    down = function() {
      wrapper.stop(true,false).animate({'height':'100%'}, 300);
    };

    wrapper.toggleClass('down up');
    direction = wrapper.attr('class').replace('blinds-wrap', '').trim();

    if ( direction == 'up' ) { up(); }
    else { down(); }
  };
}).call(this);

$(document).ready(function() {
  $(".blinds").click(function() {

    $(this).pullBlinds();
  });
});

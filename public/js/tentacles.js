(function() {

  $.fn.tentacleAttack = function(opts) {
    var animateFrame, interval, self;
    animateFrame = function() {
      var pos, position;
      position = this.css('background-position').split(" ");
      pos = parseInt(position[1]);
      if (this.data('skipframe')) {
        this.data('skipframe', this.data('skipframe') - 1);
        if (this.data('skipframe') === -1) this.removeData('skipframe');
      } else if (!(this.data('withdrawing'))) {
        pos -= this.data('offset');
        if (pos === (this.data('frames') - 1) * this.data('offset') * -1) {
          this.data('withdrawing', true);
          this.data('skipframe', 3);
        }
      } else {
        pos += this.data('offset');
        if (pos === 0) {
          this.removeData('withdrawing');
          this.removeData('animating');
          clearInterval(this.data('attackInterval'));
        }
      }
      return this.css('background-position', "" + position[0] + " " + pos + "px");
    };
    if (opts != null) {
      this.data('offset', opts.offset);
      return this.data('frames', opts.frames);
    } else if (!(this.data('animating') != null)) {
      this.data('animating', true);
      self = this;
      interval = setInterval(function() {
        return animateFrame.call(self);
      }, 40);
      return this.data('attackInterval', interval);
    }
  };

  $('.tentacle1').tentacleAttack({
    frames: 5,
    offset: 600
  });

  $('.tentacle2').tentacleAttack({
    frames: 8,
    offset: 600
  });

  $('.tentacle3').tentacleAttack({
    frames: 8,
    offset: 600
  });

}).call(this);

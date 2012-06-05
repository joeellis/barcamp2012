(function() {
  var t1, t2, t3;

  $.fn.tentacleAttack = function(opts) {
    var animateFrame,
      _this = this;
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
          this.trigger('attacked');
        }
      } else {
        pos += this.data('offset');
        if (pos === 0) this.trigger('withdrawn');
      }
      return this.css('background-position', "" + position[0] + " " + pos + "px");
    };
    if (opts != null) {
      this.data('offset', opts.offset);
      this.data('frames', opts.frames);
      this.on('withdrawn', function() {
        _this.removeData('withdrawing');
        _this.removeData('animating');
        return clearInterval(_this.data('attackInterval'));
      });
    }
    return this.on('attack', function() {
      var interval, self;
      if (!(_this.data('animating') != null)) {
        _this.data('animating', true);
        self = _this;
        interval = setInterval(function() {
          return animateFrame.call(self);
        }, 40);
        _this.trigger('attacking');
        return _this.data('attackInterval', interval);
      }
    });
  };

  $.fn.isVillainous = function(who) {
    var _this = this;
    return this.click(function() {
      who.one('attacked', function() {
        _this.trigger('explode');
        return _this.hide();
      });
      who.trigger('attack');
      return setTimeout(function() {
        return _this.fadeIn();
      }, 5000);
    });
  };

  t1 = $('.tentacle1');

  t2 = $('.tentacle2');

  t3 = $('.tentacle3');

  t1.tentacleAttack({
    frames: 5,
    offset: 600
  });

  t2.tentacleAttack({
    frames: 8,
    offset: 600
  });

  t3.tentacleAttack({
    frames: 8,
    offset: 600
  });

  t1.on('attacking', function() {
    t2.hide();
    return t3.hide();
  });

  t1.on('withdrawn', function() {
    t2.show();
    return t3.show();
  });

  t2.on('attacking', function() {
    t1.hide();
    return t3.hide();
  });

  t2.on('withdrawn', function() {
    t1.show();
    return t3.show();
  });

  t3.on('attacking', function() {
    t1.hide();
    return t2.hide();
  });

  t3.on('withdrawn', function() {
    t1.show();
    return t2.show();
  });

}).call(this);

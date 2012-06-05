(function() {

  $.fn.explode = function(opts) {
    var count, defaults, images, randBetween, rotate, sound, __explode,
      _this = this;
    if (opts == null) opts = {};
    randBetween = function(a, b) {
      return Math.floor(Math.random() * (b - a)) + a;
    };
    rotate = function(what, speed) {
      var r;
      what.r || (what.r = 0);
      r = what.r = what.r + speed;
      what.css('rotation', r + 'deg');
      what.css('-webkit-transform', 'rotate(' + r + 'deg)');
      return what.css('-moz-transform', 'rotate(' + r + 'deg)');
    };
    __explode = function(iOpts) {
      var arc, start, startX, startY,
        _this = this;
      $('body').append(this);
      this.show();
      startX = iOpts.startX;
      startY = $('body').height() - iOpts.startY;
      this.css('left', startX);
      this.css('bottom', startY);
      start = (new Date).getTime();
      arc = function(what) {
        var gravity, t, x, y;
        t = ((new Date).getTime() - start) / 1000;
        gravity = 9.8;
        x = startX + iOpts.v * Math.sin(iOpts.angle) * t;
        y = startY + (iOpts.v * Math.cos(iOpts.angle) + gravity * gravity * t * -1) * t;
        what.css('left', "" + x + "px");
        return what.css('bottom', "" + y + "px");
      };
      this.data('intervals', []);
      this.data('intervals').push(setInterval(rotate, 40, this, iOpts.rotateSpeed));
      this.data('intervals').push(setInterval(arc, 40, this, iOpts.rotateSpeed));
      setTimeout(function() {
        return _this.fadeOut(1000, function() {
          return _this.trigger('removed');
        });
      }, 3000);
      return this.on('removed', function() {
        $.each(_this.data('intervals'), function(index, interval) {
          return clearInterval(interval);
        });
        return _this.remove();
      });
    };
    defaults = {
      minV: 130,
      maxV: 350,
      rotateSpeed: 15,
      minAngle: 80,
      maxAngle: 130,
      minRotate: 5,
      maxRotate: 25,
      count: 30,
      startX: this.offset().left,
      startY: this.offset().top + (this.height() / 4),
      images: ['img/helicopter.gif']
    };
    $.extend(defaults, opts);
    opts = defaults;
    images = [];
    $.each(opts.images, function(index, image) {
      var img;
      img = $("<img src='" + image + "' style='width: 70px;display: none; position: absolute;z-index: 55'/>");
      $('body').append(img);
      return images.push(img);
    });
    count = opts.count;
    if (opts.sound != null) {
      sound = $("<audio id='sound-" + opts.sound + "' preload='auto'><source src='sounds/" + opts.sound + ".mp3' /><source src='sounds/" + opts.sound + ".ogg' /></audio>");
      $('body').append(sound);
    }
    return this.on('explode', function() {
      var element, startX, startY, total, _results;
      startX = opts.startX || _this.offset().left;
      startY = opts.startY || _this.offset().top + (_this.height() / 4);
      total = count;
      if (opts.sound != null) $("#sound-" + opts.sound).get(0).play();
      _results = [];
      while (total -= 1) {
        element = images[randBetween(0, images.length)].clone();
        _results.push(__explode.call(element, {
          v: randBetween(opts.minV, opts.maxV),
          angle: randBetween(opts.minAngle, opts.maxAngle),
          startX: startX,
          startY: startY,
          rotateSpeed: randBetween(opts.minRotate, opts.maxRotate)
        }));
      }
      return _results;
    });
  };

  $(function() {
    var asteroid, donkeycart, roach;
    asteroid = $('#scumbag-asteroid');
    asteroid.explode({
      sound: 'explosion',
      images: ['img/scumbag-hat.png', 'img/rock.png', 'img/triceratops-skull.png']
    });
    asteroid.isVillainous($('.tentacle3'));
    donkeycart = $('#donkeycart');
    donkeycart.explode({
      sound: 'WilhelmScream',
      images: ['img/scumbag-hat.png', 'img/horse-poop.png', 'img/wagonwheel.png']
    });
    donkeycart.isVillainous($('.tentacle2'));
    roach = $('#cockroach');
    roach.explode({
      sound: 'female_scream',
      images: ['img/scumbag-hat.png', 'img/cockroach-leg.png', 'img/intestines.png']
    });
    return roach.isVillainous($('.tentacle1'));
  });

}).call(this);

(function() {

  $.fn.explode = function(opts) {
    var count, defaults, images, randBetween, rotate, __explode,
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
      console.log(iOpts);
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
        x = what.offset().left;
        y = $('body').height() - what.offset().top;
        x = startX + iOpts.v * Math.sin(iOpts.angle) * t;
        y = startY + (iOpts.v + gravity * gravity * t * -1) * t;
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
      minAngle: 60,
      maxAngle: 150,
      minRotate: 5,
      maxRotate: 25,
      count: 30,
      startX: this.offset().left,
      startY: this.offset().top + (this.height() / 4),
      images: ['img/helicopter.gif']
    };
    $.extend(defaults, opts);
    opts = defaults;
    console.log(opts);
    images = [];
    $.each(opts.images, function(index, image) {
      var img;
      img = $("<img src='" + image + "' style='width: 70px;display: none; position: absolute;z-index: 55'/>");
      $('body').append(img);
      return images.push(img);
    });
    count = opts.count;
    return this.on('explode', function() {
      var element, startX, startY, total, _results;
      startX = opts.startX || _this.offset().left;
      startY = opts.startY || _this.offset().top + (_this.height() / 4);
      total = count;
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
    var asteroid, donkeycart;
    asteroid = $('#scumbag-asteroid');
    asteroid.explode({
      images: ['img/scumbag-hat.png', 'img/rock.png', 'img/triceratops-skull.png']
    });
    asteroid.isVillainous($('.tentacle3'));
    donkeycart = $('#donkeycart');
    donkeycart.explode();
    return donkeycart.isVillainous($('.tentacle2'));
  });

}).call(this);

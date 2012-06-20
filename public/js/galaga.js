(function() {

  $.fn.galagable = function(opts) {
    var sound;
    if (opts == null) opts = {};
    if ($('audio#galaga').size() === 0) {
      sound = $("<audio id='galaga' preload='auto'><source src='sounds/explosion.mp3' /><source src='sounds/explosion.ogg' /></audio>");
      $('body').append(sound);
    }
    sound = $('audio#galaga');
    this.each(function() {
      var self,
        _this = this;
      self = $(this);
      return self.on('galaga', function() {
        var width;
        width = self.width();
        self.css('backgroundImage', 'none');
        self.stop();
        self.html("<img src='img/galaga_explosion.png' width=" + width + "/>");
        sound.get(0).play();
        return setTimeout(function() {
          return self.remove();
        }, 2000);
      });
    });
    return this;
  };

  $(function() {
    return $('.helicopter, #utahraptor, #small-trex, #labdog').galagable().click(function() {
      return $(this).trigger('galaga');
    });
  });

}).call(this);

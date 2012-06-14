$.fn.blowUpHelicopters = function() {
  $('.helicopter').click();
};

$.fn.blowUpHelicopter = function() {
  $('.helicopter').first().click();
};

$.fn.killRoach = function() {
  $('#cockroach').click();
};

$.fn.killScumbagAsteroid = function() {
  $('#scumbag-asteroid').click();
};

$.fn.playMario = function() {
  $('a#bario').click();
};

$.fn.reposition = function() {
  var marginTop = $(this).outerHeight() / 2;
  return $(this).css({'margin-top':  -marginTop });;
};

window.textGame = {
  init: function() {
    this.inputField = $("#entryField");
    this.messageBox = $(".message-body");
    $('#text-entry').hide();

    this.bindCommands();
    this.bindInput( this.inputField );
    this.bindCloseBox( this.messageBox );
  },
  bindInput: function($input) {
    var self = this;
    
    $input.parent().click(function(){
      $input.focus();
    });

    $input.focus(function(){
      $(this).data("hasfocus", true);
      if ( $(this).val() === '_') {
        $(this).val('');
      }
    })
    .blur(function(){
      $(this).data("hasfocus", false);
      if ( $(this).val() === '' ) {
        $(this).val('_');
      }  
    })
    .keyup(function(e){
      if (e.which === 13 && $(this).data("hasfocus")) {
        self.submitCommand( $(this).val().toLowerCase() );
        $(this).val('');
      }
    });
  },
  submitCommand: function( input ) {
    var self = this;
    var words = input.split(" "); // break up the words
    var phrase = words.join("+"); // check for phrases.

    $.each(self.commands, function(i, command) {
      if ( $.inArray(phrase, command) !== -1) {
        self.getFunction( self.commands[i]['function'] );
        self.getContents( self.commands[i]['el'] );
        return false;
      }
      else {
        $.each(words, function(t, word){
          if ( $.inArray(word, command) !== -1) {
            self.getFunction( self.commands[i]['function'] );
            self.getContents( self.commands[i]['el'] );
          }
        });
      }
    });
  },
  bindCommands: function() {
    this.commands = [];
    var self = this;
    $('#messages').children().each(function(i, el){
      var keywords = $(this).data('keywords').toLowerCase().split(" ");
      self.commands.push( keywords );
      self.commands[i]['function'] = $(this).data('function');
      self.commands[i]['el'] = $(el).children() ;
    });
  },
  getFunction: function( callback ) {
    if ( callback ) {
      [callback];
      $(document)[callback].call();
    }
  },
  getContents: function( $el ) {
    if ( $el.length > 0  ) {
      this.displayContent( $el );
    }
  },
  displayContent: function( $content ) {
    this.messageBox.fadeOut().html( $content ).reposition().fadeIn(100);
    this.bindEnter();
  },
  bindEnter: function() {
    var self = this;
    $('body').keydown(function(e){
      if (e.which === 13) {
        $(self.messageBox).click();
      }
    });
  },
  bindCloseBox: function( box ) {
    var self = this;
    $(box).click(function(){
      $(this).fadeOut(100);
    }).hide();
  }
};

$(document).ready(function() {
  $('body').keyup(function(e){
    if (e.which === 192) {
      $('#text-entry').show().find('input').focus();      
    }
    else if (e.which === 27) {
      $('#text-entry input').blur().closest('#text-entry').hide();
    }
  });

  $('.rampage, #underground').click(function(){
    $('#text-entry').show().find('input').focus();      
  });
  return textGame.init();
});


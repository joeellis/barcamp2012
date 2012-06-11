$.fn.blowUpHelicopters = function() {
  $('.helicopter').click();
};

$.fn.blowUpHelicopter = function() {
  $('.helicopter').first().click();
};

window.textGame = {
  init: function() {
    this.input = "#entryField";
    this.bindInput( $(this.input) );

    this.bindCommands();
    //this.helicoptor = this.blowUpHelicoptors();
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
        self.submitCommand( $(this).val() );
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
        return false;
      }
      $.each(words, function(t, word){
        if ( $.inArray(word, command) !== -1) {
          console.log(word);
          self.getFunction( self.commands[i]['function'] );
        }
      });
    });
  },
  bindCommands: function() {
    this.commands = [];
    var self = this;
    $( $('#messages').children() ).each(function(i){
      var keywords = $(this).data('keywords').split(" ");
      self.commands.push( keywords );
      self.commands[i]['function'] = $(this).data('function');
    });
    console.log(this.commands);
  },
  getFunction: function( callback ) {
    if ( callback ) {
      $(document)[callback].call();
    }
    else {
      console.log('no such function');
    }
  }
};

$(document).ready(function() {
  return textGame.init();
});


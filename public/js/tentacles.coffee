$.fn.tentacleAttack = (opts) ->

  animateFrame = ->
    position = @css('background-position').split " "
    pos = parseInt position[1]
    if @data 'skipframe'
      @data 'skipframe', @data('skipframe') - 1
      @removeData('skipframe') if @data('skipframe') == -1
    else if !(@data 'withdrawing')
      pos -= @data 'offset'
      if pos == (@data('frames') - 1) * @data('offset') * -1
        @data 'withdrawing', true
        @data 'skipframe', 3
        @trigger 'attacked'
    else
      pos += @data 'offset'
      if pos == 0
        @trigger 'withdrawn'
    @css 'background-position', "#{position[0]} #{pos}px"

  if opts?
    # opts are sent: do setup
    @data 'offset', opts.offset
    @data 'frames', opts.frames
    @on 'withdrawn', =>
      @removeData 'withdrawing'
      @removeData 'animating'
      clearInterval @data('attackInterval')

  @on 'attack', =>
    if !@data('animating')?
      # no opts sent: ATTACK!
      @data 'animating', true
      self = @
      interval = setInterval ->
        animateFrame.call self
      , 40
      @trigger 'attacking'
      @data 'attackInterval', interval

$.fn.isVillainous = (who) ->
  @click =>
    who.one 'attacked', =>
      @trigger 'explode'
      @hide()
    who.trigger 'attack'
    setTimeout =>
      @fadeIn()
    , 5000

$('.tentacle1').tentacleAttack frames: 5, offset: 600
$('.tentacle2').tentacleAttack frames: 8, offset: 600
$('.tentacle3').tentacleAttack frames: 8, offset: 600

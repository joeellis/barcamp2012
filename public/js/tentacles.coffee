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

t1 = $('.tentacle1')
t2 = $('.tentacle2')
t3 = $('.tentacle3')
t1.tentacleAttack frames: 5, offset: 600
t2.tentacleAttack frames: 8, offset: 600
t3.tentacleAttack frames: 8, offset: 600
t1.on 'attacking', ->
  t2.hide()
  t3.hide()
t1.on 'withdrawn', ->
  t2.show()
  t3.show()

t2.on 'attacking', ->
  t1.hide()
  t3.hide()
t2.on 'withdrawn', ->
  t1.show()
  t3.show()

t3.on 'attacking', ->
  t1.hide()
  t2.hide()
t3.on 'withdrawn', ->
  t1.show()
  t2.show()

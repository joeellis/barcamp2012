$.fn.explode = (opts = {}) ->

  randBetween = (a, b) ->
    Math.floor( Math.random() * (b-a) ) + a

  # we can't use jquery animate due to limitations on easing :(
  rotate = (what, speed) ->
    what.r ||= 0
    r = what.r = what.r + speed
    what.css('rotation', r + 'deg')
    what.css('-webkit-transform', 'rotate(' + r + 'deg)')
    what.css('-moz-transform', 'rotate(' + r + 'deg)')

  __explode = (iOpts) ->
    $('body').append @
    @show()
    startX = iOpts.startX
    startY = $('body').height() - iOpts.startY

    @css 'left', startX
    @css 'bottom', startY

    start = (new Date).getTime()

    arc = (what) ->
      t = ((new Date).getTime() - start) / 1000
      gravity = 9.8
      x = what.offset().left
      y = $('body').height() - what.offset().top
      x = startX + iOpts.v * Math.sin(iOpts.angle) * t
      y = startY + (iOpts.v * Math.cos(iOpts.angle) + gravity * gravity * t * -1) * t
      what.css('left', "#{x}px")
      what.css('bottom', "#{y}px")

    @data 'intervals', []
    @data('intervals').push setInterval(rotate, 40, @, iOpts.rotateSpeed)
    @data('intervals').push setInterval(arc, 40, @, iOpts.rotateSpeed)

    setTimeout =>
      @fadeOut 1000, =>
        @trigger 'removed'
    , 3000

    @on 'removed', =>
      $.each @data('intervals'), (index, interval) ->
        clearInterval interval
      @remove()

  defaults =
    minV: 130
    maxV: 350
    rotateSpeed: 15
    minAngle: 80
    maxAngle: 130
    minRotate: 5
    maxRotate: 25
    count: 30
    startX: @offset().left
    startY: @offset().top + (@height() / 4)
    images: [
      'img/helicopter.gif'
    ]

  $.extend(defaults, opts)
  opts = defaults
  images = []
  # preload images
  $.each opts.images, (index, image) ->
    img = $("<img src='#{image}' style='width: 70px;display: none; position: absolute;z-index: 55'/>")
    $('body').append(img)
    images.push img

  count = opts.count

  if opts.sound?
    sound = $("<audio id='sound-#{opts.sound}' preload='auto'><source src='sounds/#{opts.sound}.mp3' /><source src='sounds/#{opts.sound}.ogg' /></audio>")
    $('body').append sound

  @on 'explode', =>
    startX = opts.startX || @offset().left
    startY = opts.startY || @offset().top + (@height() / 4)
    total = count
    if opts.sound?
      $("#sound-#{opts.sound}").get(0).play()
    while total -= 1
      element = images[randBetween 0, images.length].clone()
      __explode.call element,
        v: randBetween opts.minV, opts.maxV
        angle: randBetween opts.minAngle, opts.maxAngle
        startX: startX
        startY: startY
        rotateSpeed: randBetween opts.minRotate, opts.maxRotate

$ ->
  asteroid = $('#scumbag-asteroid')
  asteroid.explode
    sound: 'explosion'
    images: [
      'img/scumbag-hat.png'
      'img/rock.png'
      'img/triceratops-skull.png'
    ]
  asteroid.isVillainous($('.tentacle3'))

  donkeycart = $('#donkeycart')
  donkeycart.explode
    sound: 'WilhelmScream'
    images: [
      'img/scumbag-hat.png'
      'img/horse-poop.png'
      'img/wagonwheel.png'
    ]

  donkeycart.isVillainous($('.tentacle2'))

  roach = $('#cockroach')
  roach.explode
    sound: 'female_scream'
    images: [
      'img/scumbag-hat.png'
      'img/cockroach-leg.png'
      'img/intestines.png'
    ]

  roach.isVillainous $('.tentacle1')

registerLink = "http://barcampnola5.eventbrite.com/"
snitchCss = position:'absolute', 'z-index': 100

rnd = (max, min=0) -> Math.floor(((max-min)*Math.random())+min)

window.createSnitch = ->
	snitch = $("<a href=\"#{registerLink}\" target=_blank>")
		.append($('<img src="img/snitch.png" class="registration-snitch" />').css width: '100px', height: '33px')
		.css(snitchCss)
		.css(top: rnd $(window).height())
		.appendTo('body')
		.click -> $(@).remove()

		animate = -> 
			return if !snitch.parents('body')[0]

			win = top: $(window).scrollTop(), left: $(window).width()

			pos = snitch.position()
			
			newLeft = pos.left + (rnd 200, -200)
			newLeft = 0 if newLeft < 0
			newLeft = win.left - snitch.width() if newLeft > win.left - snitch.width()

			newTop = pos.top + (rnd 200, -200)
			newTop = 0 if newTop < 0
			newTop = $(document).height() - snitch.height() if newTop > ($(document).height() - snitch.height()) 

			snitch.animate
					left: newLeft
					top: newTop
				,
					duration: rnd 1000
					complete: !window.createSnitch.pause && animate
 
		animate()
		snitch

$ -> 

	t = 5000
	setTimeout (schedule = ->
			createSnitch()
			t *= 4
			setTimeout schedule, t
		), t
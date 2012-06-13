$ ->
	window.$ptero = $('<img src="img/ptero-redactyl.png">').css
			position: 'absolute'
			width: 300
			height: 163
			'z-index': 99999


	$body = $('body')

	caw = ((el)-> -> el.play&&el.play()) $('<audio id="ptero-caw" preload="auto"><source src="sounds/ptero-redactyl.mp3" /></audio>')
				.appendTo($body)[0]
	sratch = ((el)-> -> el.play&&el.play()) $('<audio id="ptero-redaction" preload="auto"><source src="sounds/redaction.mp3" /></audio>')
				.appendTo($body)[0]

	pteroRedacting = false

	$body.on 'mousedown', (e) ->
		return if not e.ctrlKey
		return if pteroRedacting

		pteroRedacting = true

		minT = $body.scrollTop()
		maxT = minT + $(window).height() - $ptero.height()

		redaction = x: e.pageX-10, y: e.pageY-10
		$ptero.css 
			left: 0
			top: redaction.y - 75
		$ptero.appendTo 'body'
		$redaction = $('<div class="redaction">').css
			position: 'absolute'
			'z-index': 99998
			'background-image': 'url(img/redaction.png)'
			'background-position': Math.floor(500*Math.random())+'px 0'
			left:  redaction.x
			top: redaction.y
			height: 43
			width: 0
		$redaction.appendTo 'body'
		
		$ptero
			.animate( (left: redaction.x, top: redaction.y), (duration: 800) )
			.animate (left: $(window).width()), 
				duration: 2000
				step: ->
					redactionWidth = $(@).position().left - redaction.x
					$redaction.width redactionWidth
					$redaction.toggle redactionWidth > 0  
				complete: ->
					$ptero.css left: 0
					$ptero.detach()
					setTimeout (-> $redaction.fadeOut 'slow'), 2000
					pteroRedacting = false

		caw()
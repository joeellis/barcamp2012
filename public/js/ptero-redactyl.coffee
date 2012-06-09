$ ->
	window.$ptero = $('<img src="img/pteroRedactyl.png">').css
			position: 'absolute'
			width: 250
			height: 150
			'z-index': 99999
			'background-color': 'green'


	$body = $('body')

	$body.on 'keypress', (e) ->
		return if not (/r/i).test String.fromCharCode e.which

		console.log "ptero-redactyl!"
		minT = $body.scrollTop()
		maxT = minT + $(window).height() - $ptero.height()

		$ptero.css left: 0, top: (Math.floor ( (Math.random() * (maxT-minT)) + minT ) )
		$ptero.appendTo 'body'
		$redaction = $('<div class="redaction">').css
			position: 'absolute'
			'z-index': 99998
			'background-color': 'black'
			height: 50
			width: 0

		$redaction.css(top: $ptero.position().top, left: $ptero.position().left).appendTo 'body'
		$ptero.animate (left: $(window).width()), 
			duration: 2000
			step: ->
				$redaction.width $(@).position().left
				console.log 'step', @, arguments
			complete: ->
				$ptero.css left: 0
				$ptero.detach()
				setTimeout (-> $redaction.fadeOut 'slow'), 2000
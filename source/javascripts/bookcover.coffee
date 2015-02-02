class window.Bookcover
  constructor: (@canvasID) ->
    console.log @height()

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  draw: =>
    # define in class

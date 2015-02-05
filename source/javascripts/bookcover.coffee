class window.Bookcover
  constructor: (@canvasID) ->
    @canvas = new fabric.StaticCanvas(@canvasID)

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  draw: =>
    # define in class

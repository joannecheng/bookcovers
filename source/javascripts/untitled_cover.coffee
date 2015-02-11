class RailsIosCover
  constructor: (@canvasID) ->
    $("##{@canvasID}").css("background-color", "rgba(255, 255, 255, 1)")

  draw: =>
    // random image, color, sorted

  _triangle: =>
    new Path.RegularPolygon({
      closed: true
      sides: 6
      radius: 50
      fillColor: "gray"
    })

cover = new RailsIosCover("book_cover")
cover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(h)
  file.save()

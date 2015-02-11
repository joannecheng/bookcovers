class RailsIosCover
  constructor: (@canvasID) ->
    $("##{@canvasID}").css("background-color", "rgba(255, 255, 255, 1)")

  draw: =>
    columnCount = Math.floor(@width()/50) - 1
    rowCount = Math.floor(@height()/80) - 1

    for y in [0..rowCount]
      for x in [1..columnCount]
        triangle = @_triangle([50*x, 80*y+50])
        if (x + y) % 2 == 0
          triangle.rotate(180)

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  _triangle: (pos) =>
    color = new Color(Math.random(), Math.random()/4, Math.random()/2)
    if Math.random() > 0.4
      color = "white"

    new Path.RegularPolygon({
      center: pos
      closed: true
      sides: 3
      radius: 50
      fillColor: color
    })

cover = new RailsIosCover("book_cover")
cover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(h)
  file.save()

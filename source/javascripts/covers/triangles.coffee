class Triangles
  constructor: (@canvasID) ->
    $("##{@canvasID}").attr("background-color", "rgba(244, 244, 244, 1)")

  draw: =>
    @_drawBackground()
    columnCount = Math.floor(@width()/50) - 1
    rowCount = Math.floor(@height()/80) - 1

    for y in [0..rowCount]
      for x in [1..columnCount]
        triangle = @_triangle([50*x, 80*y+60])
        if (x + y) % 2 == 0
          triangle.rotate(180)

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  toSVG: =>
    paper.project.exportSVG(asString: true)

  _drawBackground: =>
    new Path.Rectangle(
      from: [0, 0]
      to: [@width(), @height()]
      fillColor: "rgba(240, 240, 240, 1)"
    )

  _triangle: (pos) =>
    color = @_randomColor()
    if Math.random() > 0.4
      color = "white"

    new Path.RegularPolygon({
      center: pos
      closed: true
      sides: 3
      radius: 50
      fillColor: color
    })

  _randomColor: =>
    red = Math.random()

    blue = Math.random()/2
    green = Math.random()/4
    new Color(red, green, blue, 0.7)

cover = new Triangles("book_cover")
cover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(cover)
  file.save()

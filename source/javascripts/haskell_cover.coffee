class HaskellCover
  constructor: (@canvasID) ->
    $("##{@canvasID}").css("background-color", "rgba(255, 255, 255, 1)")

  draw: =>
    centerX = @width()/2
    centerY = @height()/2
    numCircles = 40 + Math.random() * 40

    for n in [0..numCircles]
      path = new Path()
      path.strokeColor = "black"
      @_drawCircle(path, centerX, centerY)
      centerX += noise.perlin3(n/numCircles, n/numCircles, Date.now()) * 20
      centerY += noise.perlin3(n/numCircles*0.1, n/numCircles*0.01, Date.now()) * 20

  toSVG: =>
    paper.project.exportSVG(asString: true)

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  _drawCircle: (path, centerX, centerY) =>
    r = 130
    formResolution = 15
    angle = 360/formResolution * Math.PI/180  # radians
    arr = []
    for n in [1..formResolution]
      # value = noise.perlin3(n/100, n/100, Date.now()) * 100
      value = Math.random() * 8
      path.add new Point(centerX + r*Math.cos(angle*n + value), centerY + r*Math.sin(angle*n + value))
    path.strokeWidth = 0.2 + Math.random() /2
    path.strokeJoin = "round"
    path.smooth()

haskellCover = new HaskellCover("book_cover")
haskellCover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(h)
  file.save()

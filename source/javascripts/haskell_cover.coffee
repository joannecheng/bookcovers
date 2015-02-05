class HaskellCover
  constructor: (@canvasID) ->

  draw: =>
    centerX = @width()/2
    centerY = @height()/2
    path = new Path()
    path.strokeColor = "black"
    numCircles = 20

    for n in [0..numCircles]
      @_drawCircle(path, centerX, centerY)
      centerX += noise.perlin3(n/numCircles, n/numCircles, Date.now()) * 20
      centerY += noise.perlin3(n/numCircles*0.1, n/numCircles*0.01, Date.now()) * 20


  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  _drawCircle: (path, centerX, centerY) =>
    r = 140
    seedInc = 0.001
    formResolution = 15
    angle = 360/formResolution * Math.PI/180  # radians
    arr = []
    for n in [1..formResolution]
      # value = noise.perlin3(n/100, n/100, Date.now()) * 100
      value = Math.random() * 10
      path.add new Point(centerX + r*Math.cos(angle*n + value), centerY + r*Math.sin(angle*n + value))
    path.strokeWidth = 0.5
    path.strokeJoin = "round"
    path.smooth()

h = new HaskellCover("book_cover")
h.draw()

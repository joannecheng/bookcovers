class ConcentricCircles
  constructor: (@canvasID) ->

  draw: =>
    @_drawBackground()

    for i in [0..60]
      radius = i * 14
      #new Path.Circle(
      #  center: [@width()/2, @height()/2]
      #  radius: radius
      #  strokeColor: "rgb(200, 200, 200)"
      #  strokeWidth: Math.random() * 5
      #)
      startAngle = Math.random() * Math.PI * 2
      endAngle = startAngle + Math.random() * Math.PI * 2
      new Path.Arc(
        from: [@width()/2 + radius*Math.cos(startAngle), @height()/2 + radius*Math.sin(startAngle)]
        through: [@width()/2, @height()/2 + radius]
        to: [@width()/2 + radius*Math.cos(endAngle), @height()/2 + radius*Math.sin(endAngle)]
        strokeColor: "rgb(200, 200, 200)"
        strokeWidth: Math.random() * 5
      )

  height: =>
    $("##{@canvasID}").height()

  width: =>
    $("##{@canvasID}").width()

  _drawBackground: =>
    new Path.Rectangle(
      point: [0, 0]
      size: [@width(), @height()]
      fillColor: "rgb(30, 30, 30)"
    )

cover = new ConcentricCircles("book_cover")
cover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(cover)
  file.save()

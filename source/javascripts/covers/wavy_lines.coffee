class WavyLines
  constructor: (@canvasID) ->
    @groupWidth = 65
    @numGroups = Math.floor(@width() / @groupWidth)

  draw: =>
    @_drawBackground()

    for i in [0..@numGroups]
      startingX = 20 + i * @groupWidth
      numberLines = Math.floor(Math.random()*4 + 20)
      @_drawWavyLine(startingX) for [0..numberLines]

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
      fillColor: "rgba(242, 242, 242, 1)"
    )

  _drawWavyLine: (baseX) =>
    path = new Path(@_segments(baseX))
    path.strokeColor = @_randomColor()
    path.strokeWidth = 0.5
    path.smooth()

  _segments: (columnPosition) =>
    increment = 20
    changed = false

    _.map [0..@height()/increment], (i) =>
      otherColumnProbability = Math.random()
      if otherColumnProbability < 0.005
        changed = true
        columnPosition = Math.floor(Math.random() * @numGroups) * @groupWidth + 20

      [(columnPosition + Math.random() * 20), increment*i]

  _randomColor: =>
    @_colors ||= [
      "rgb(200, 182, 100)"
      "rgb(217, 90, 67)"
      "rgb(192, 40, 65)"
      "rgb(65, 35, 55)"
      "rgb(83, 119, 121)"
    ]
    _.sample(@_colors)

cover = new WavyLines("book_cover")
cover.draw()

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(cover)
  file.save()

dist = (point1, point2) ->
  square = Math.pow(point1.getLeft() - point2.getLeft(), 2) +
    Math.pow(point1.getTop() - point2.getTop(), 2)
  Math.sqrt(square)

numPoints = Math.floor(Math.random() * 50 + 150)
width = 900
height = 900

canvas = new fabric.StaticCanvas("book_cover",
  backgroundColor: "rgba(40, 40, 40, 1)"
)
points = _.map [0.. numPoints], ->
  new fabric.Circle(
    left: Math.random() * (width - 20) + 40
    top: Math.random() * (height - 20) + 40
    originX: "center"
    originY: "center"
    centeredScaling: true
    fill: "rgba(200, 200, 200, 0.8)"
    radius: 2
  )

lines = []
_.each points, (startingPoint) ->
  endPoints = _.select(points, (point) -> dist(startingPoint, point) < 140)

  _.each endPoints, (endPoint) ->
    line = new fabric.Line(
      [startingPoint.getLeft(), startingPoint.getTop(), endPoint.getLeft(), endPoint.getTop()],
      stroke: "rgba(200, 200, 200, 0.6)"
      strokeWidth: 0.25
    )
    if !_.find(lines, (existingLine) -> (line.x1 == existingLine.x2 && line.y1 == existingLine.y2 && line.x2 == existingLine.x1 && line.y2 == existingLine.x1))?
      lines.push line

canvas.add(new fabric.Group(lines))
canvas.add(new fabric.Group(points))

$(".canvas-to-svg").click (event) =>
  event.preventDefault()
  file = new CanvasSaver(canvas) 
  file.save()

dist = (point1, point2) ->
  square = Math.pow(point1.getLeft() - point2.getLeft(), 2) +
    Math.pow(point1.getTop() - point2.getTop(), 2)
  Math.sqrt(square)

numPoints = Math.floor(Math.random() * 50 + 150)
width = 900
height = 900

canvas = new fabric.StaticCanvas("book_cover")
points = _.map [0.. numPoints], ->
  new fabric.Circle(
    left: Math.random() * width
    top: Math.random() * height
    radius: 2
  )

lines = []
_.each points, (startingPoint) ->
  endPoints = _.select(points, (point) -> dist(startingPoint, point) < 140)

  _.each endPoints, (endPoint) ->
    line = new fabric.Line(
      [startingPoint.getLeft(), startingPoint.getTop(), endPoint.getLeft(), endPoint.getTop()],
      stroke: "black"
      strokeWidth: 0.25
    )
    if !_.find(lines, (existingLine) -> (line.x1 == existingLine.x2 && line.y1 == existingLine.y2 && line.x2 == existingLine.x1 && line.y2 == existingLine.x1))?
      lines.push line

canvas.add(new fabric.Group(lines))
canvas.add(new fabric.Group(points))



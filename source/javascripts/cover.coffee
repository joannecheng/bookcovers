dist = (point1, point2) ->
  square = Math.pow(point1.getLeft() - point2.getLeft(), 2) -
    Math.pow(point1.getTop() - point2.getTop(), 2)
  Math.sqrt(square)

numPoints = Math.floor(Math.random() * 50 + 150)
width = 980
height = 1200

canvas = new fabric.StaticCanvas("book_cover")
points = _.map [0.. numPoints], ->
  new fabric.Circle(
    left: Math.random() * width
    top: Math.random() * height
    radius: 2
  )

_.each points, (startingPoint) ->
  console.log dist(startingPoint, points[0])
  endPoints = _.where(points, (point) -> dist(startingPoint, point) < 60)

  _.each endPoints, (endPoint) ->
    console.log "hey!"
    #line = new fabric.Line(
    #  [startingPoint.getLeft(), startingPoint.getTop(), endPoint.getLeft(), endPoint.getTop()],
    #  stroke: "black"
    #)
    #canvas.add(line)

canvas.add(new fabric.Group(points))



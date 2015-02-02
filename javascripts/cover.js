(function() {
  var canvas, dist, height, lines, numPoints, points, width, _i, _results;

  dist = function(point1, point2) {
    var square;
    square = Math.pow(point1.getLeft() - point2.getLeft(), 2) + Math.pow(point1.getTop() - point2.getTop(), 2);
    return Math.sqrt(square);
  };

  numPoints = Math.floor(Math.random() * 50 + 150);

  width = 900;

  height = 900;

  canvas = new fabric.StaticCanvas("book_cover");

  points = _.map((function() {
    _results = [];
    for (var _i = 0; 0 <= numPoints ? _i <= numPoints : _i >= numPoints; 0 <= numPoints ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this), function() {
    return new fabric.Circle({
      left: Math.random() * width,
      top: Math.random() * height,
      radius: 2
    });
  });

  lines = [];

  _.each(points, function(startingPoint) {
    var endPoints;
    endPoints = _.select(points, function(point) {
      return dist(startingPoint, point) < 140;
    });
    return _.each(endPoints, function(endPoint) {
      var line;
      line = new fabric.Line([startingPoint.getLeft(), startingPoint.getTop(), endPoint.getLeft(), endPoint.getTop()], {
        stroke: "black",
        strokeWidth: 0.25
      });
      if (_.find(lines, function(existingLine) {
        return line.x1 === existingLine.x2 && line.y1 === existingLine.y2 && line.x2 === existingLine.x1 && line.y2 === existingLine.x1;
      }) == null) {
        return lines.push(line);
      }
    });
  });

  canvas.add(new fabric.Group(lines));

  canvas.add(new fabric.Group(points));

}).call(this);

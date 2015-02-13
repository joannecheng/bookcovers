(function() {
  var canvas, dist, height, lines, numPoints, points, width, _i, _results;

  dist = function(point1, point2) {
    var square;
    square = Math.pow(point1.getLeft() - point2.getLeft(), 2) + Math.pow(point1.getTop() - point2.getTop(), 2);
    return Math.sqrt(square);
  };

  numPoints = Math.floor(Math.random() * 50 + 150);

  height = $("canvas").height();

  width = $("canvas").width();

  canvas = new fabric.StaticCanvas("book_cover", {
    backgroundColor: "rgba(40, 40, 40, 1)"
  });

  points = _.map((function() {
    _results = [];
    for (var _i = 0; 0 <= numPoints ? _i <= numPoints : _i >= numPoints; 0 <= numPoints ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this), function() {
    return new fabric.Circle({
      left: Math.random() * (width - 20) + 10,
      top: Math.random() * (height - 20) + 10,
      originX: "center",
      originY: "center",
      centeredScaling: true,
      fill: "rgba(200, 200, 200, 0.8)",
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
        stroke: "rgba(200, 200, 200, 0.6)",
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

  $(".canvas-to-svg").click((function(_this) {
    return function(event) {
      var file;
      event.preventDefault();
      file = new CanvasSaver(canvas);
      return file.save();
    };
  })(this));

}).call(this);

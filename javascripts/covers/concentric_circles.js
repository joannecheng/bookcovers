(function() {
  var ConcentricCircles, cover,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ConcentricCircles = (function() {
    function ConcentricCircles(canvasID) {
      this.canvasID = canvasID;
      this._drawBackground = bind(this._drawBackground, this);
      this.width = bind(this.width, this);
      this.height = bind(this.height, this);
      this.toSVG = bind(this.toSVG, this);
      this.draw = bind(this.draw, this);
    }

    ConcentricCircles.prototype.draw = function() {
      var endAngle, i, j, radius, results, startAngle;
      this._drawBackground();
      results = [];
      for (i = j = 0; j <= 60; i = ++j) {
        radius = i * 14;
        startAngle = Math.random() * Math.PI * 2;
        endAngle = startAngle + Math.random() * Math.PI * 2;
        results.push(new Path.Arc({
          from: [this.width() / 2 + radius * Math.cos(startAngle), this.height() / 2 + radius * Math.sin(startAngle)],
          through: [this.width() / 2, this.height() / 2 + radius],
          to: [this.width() / 2 + radius * Math.cos(endAngle), this.height() / 2 + radius * Math.sin(endAngle)],
          strokeColor: "rgb(200, 200, 200)",
          strokeWidth: Math.random() * 5
        }));
      }
      return results;
    };

    ConcentricCircles.prototype.toSVG = function() {
      return paper.project.exportSVG({
        asString: true
      });
    };

    ConcentricCircles.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    ConcentricCircles.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    ConcentricCircles.prototype._drawBackground = function() {
      return new Path.Rectangle({
        point: [0, 0],
        size: [this.width(), this.height()],
        fillColor: "rgb(30, 30, 30)"
      });
    };

    return ConcentricCircles;

  })();

  cover = new ConcentricCircles("book_cover");

  cover.draw();

  $(".canvas-to-svg").click((function(_this) {
    return function(event) {
      var file;
      event.preventDefault();
      file = new CanvasSaver(cover);
      return file.save();
    };
  })(this));

}).call(this);

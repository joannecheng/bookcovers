(function() {
  var Yarn, yarn,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Yarn = (function() {
    function Yarn(canvasID) {
      this.canvasID = canvasID;
      this._drawCircle = bind(this._drawCircle, this);
      this.width = bind(this.width, this);
      this.height = bind(this.height, this);
      this.toSVG = bind(this.toSVG, this);
      this.draw = bind(this.draw, this);
      $("#" + this.canvasID).css("background-color", "rgba(255, 255, 255, 1)");
    }

    Yarn.prototype.draw = function() {
      var centerX, centerY, i, n, numCircles, path, ref, results;
      centerX = this.width() / 2;
      centerY = this.height() / 2;
      numCircles = 40 + Math.random() * 40;
      results = [];
      for (n = i = 0, ref = numCircles; 0 <= ref ? i <= ref : i >= ref; n = 0 <= ref ? ++i : --i) {
        path = new Path();
        path.strokeColor = "black";
        this._drawCircle(path, centerX, centerY);
        centerX += noise.perlin3(n / numCircles, n / numCircles, Date.now()) * 20;
        results.push(centerY += noise.perlin3(n / numCircles * 0.1, n / numCircles * 0.01, Date.now()) * 20);
      }
      return results;
    };

    Yarn.prototype.toSVG = function() {
      return paper.project.exportSVG({
        asString: true
      });
    };

    Yarn.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    Yarn.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    Yarn.prototype._drawCircle = function(path, centerX, centerY) {
      var angle, arr, formResolution, i, n, r, ref, value;
      r = 130;
      formResolution = 15;
      angle = 360 / formResolution * Math.PI / 180;
      arr = [];
      for (n = i = 1, ref = formResolution; 1 <= ref ? i <= ref : i >= ref; n = 1 <= ref ? ++i : --i) {
        value = Math.random() * 8;
        path.add(new Point(centerX + r * Math.cos(angle * n + value), centerY + r * Math.sin(angle * n + value)));
      }
      path.strokeWidth = 0.2 + Math.random() / 2;
      path.strokeJoin = "round";
      return path.smooth();
    };

    return Yarn;

  })();

  yarn = new Yarn("book_cover");

  yarn.draw();

  $(".canvas-to-svg").click((function(_this) {
    return function(event) {
      var file;
      event.preventDefault();
      file = new CanvasSaver(h);
      return file.save();
    };
  })(this));

}).call(this);

(function() {
  var HaskellCover, haskellCover,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  HaskellCover = (function() {
    function HaskellCover(_at_canvasID) {
      this.canvasID = _at_canvasID;
      this._drawCircle = __bind(this._drawCircle, this);
      this.width = __bind(this.width, this);
      this.height = __bind(this.height, this);
      this.toSVG = __bind(this.toSVG, this);
      this.draw = __bind(this.draw, this);
      $("#" + this.canvasID).css("background-color", "rgba(255, 255, 255, 1)");
    }

    HaskellCover.prototype.draw = function() {
      var centerX, centerY, n, numCircles, path, _i, _results;
      centerX = this.width() / 2;
      centerY = this.height() / 2;
      numCircles = 40 + Math.random() * 40;
      _results = [];
      for (n = _i = 0; 0 <= numCircles ? _i <= numCircles : _i >= numCircles; n = 0 <= numCircles ? ++_i : --_i) {
        path = new Path();
        path.strokeColor = "black";
        this._drawCircle(path, centerX, centerY);
        centerX += noise.perlin3(n / numCircles, n / numCircles, Date.now()) * 20;
        _results.push(centerY += noise.perlin3(n / numCircles * 0.1, n / numCircles * 0.01, Date.now()) * 20);
      }
      return _results;
    };

    HaskellCover.prototype.toSVG = function() {
      return paper.project.exportSVG({
        asString: true
      });
    };

    HaskellCover.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    HaskellCover.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    HaskellCover.prototype._drawCircle = function(path, centerX, centerY) {
      var angle, arr, formResolution, n, r, value, _i;
      r = 130;
      formResolution = 15;
      angle = 360 / formResolution * Math.PI / 180;
      arr = [];
      for (n = _i = 1; 1 <= formResolution ? _i <= formResolution : _i >= formResolution; n = 1 <= formResolution ? ++_i : --_i) {
        value = Math.random() * 8;
        path.add(new Point(centerX + r * Math.cos(angle * n + value), centerY + r * Math.sin(angle * n + value)));
      }
      path.strokeWidth = 0.2 + Math.random() / 2;
      path.strokeJoin = "round";
      return path.smooth();
    };

    return HaskellCover;

  })();

  haskellCover = new HaskellCover("book_cover");

  haskellCover.draw();

  $(".canvas-to-svg").click((function(_this) {
    return function(event) {
      var file;
      event.preventDefault();
      file = new CanvasSaver(h);
      return file.save();
    };
  })(this));

}).call(this);

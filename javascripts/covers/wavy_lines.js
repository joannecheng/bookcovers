(function() {
  var WavyLines, cover,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WavyLines = (function() {
    function WavyLines(canvasID) {
      this.canvasID = canvasID;
      this._randomColor = bind(this._randomColor, this);
      this._segments = bind(this._segments, this);
      this._drawWavyLine = bind(this._drawWavyLine, this);
      this._drawBackground = bind(this._drawBackground, this);
      this.toSVG = bind(this.toSVG, this);
      this.width = bind(this.width, this);
      this.height = bind(this.height, this);
      this.draw = bind(this.draw, this);
      this.groupWidth = 65;
      this.numGroups = Math.floor(this.width() / this.groupWidth);
    }

    WavyLines.prototype.draw = function() {
      var i, j, numberLines, ref, results, startingX;
      this._drawBackground();
      results = [];
      for (i = j = 0, ref = this.numGroups; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        startingX = 20 + i * this.groupWidth;
        numberLines = Math.floor(Math.random() * 4 + 20);
        results.push((function() {
          var k, ref1, results1;
          results1 = [];
          for (k = 0, ref1 = numberLines; 0 <= ref1 ? k <= ref1 : k >= ref1; 0 <= ref1 ? k++ : k--) {
            results1.push(this._drawWavyLine(startingX));
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WavyLines.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    WavyLines.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    WavyLines.prototype.toSVG = function() {
      return paper.project.exportSVG({
        asString: true
      });
    };

    WavyLines.prototype._drawBackground = function() {
      return new Path.Rectangle({
        from: [0, 0],
        to: [this.width(), this.height()],
        fillColor: "rgba(242, 242, 242, 1)"
      });
    };

    WavyLines.prototype._drawWavyLine = function(baseX) {
      var path;
      path = new Path(this._segments(baseX));
      path.strokeColor = this._randomColor();
      path.strokeWidth = 0.5;
      return path.smooth();
    };

    WavyLines.prototype._segments = function(columnPosition) {
      var changed, increment, j, ref, results;
      increment = 20;
      changed = false;
      return _.map((function() {
        results = [];
        for (var j = 0, ref = this.height() / increment; 0 <= ref ? j <= ref : j >= ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this), (function(_this) {
        return function(i) {
          var otherColumnProbability;
          otherColumnProbability = Math.random();
          if (otherColumnProbability < 0.005) {
            changed = true;
            columnPosition = Math.floor(Math.random() * _this.numGroups) * _this.groupWidth + 20;
          }
          return [columnPosition + Math.random() * 20, increment * i];
        };
      })(this));
    };

    WavyLines.prototype._randomColor = function() {
      this._colors || (this._colors = ["rgb(200, 182, 100)", "rgb(217, 90, 67)", "rgb(192, 40, 65)", "rgb(65, 35, 55)", "rgb(83, 119, 121)"]);
      return _.sample(this._colors);
    };

    return WavyLines;

  })();

  cover = new WavyLines("book_cover");

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

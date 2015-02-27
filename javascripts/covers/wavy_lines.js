(function() {
  var WavyLines, cover,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WavyLines = (function() {
    function WavyLines(_at_canvasID) {
      this.canvasID = _at_canvasID;
      this._randomColor = __bind(this._randomColor, this);
      this._segments = __bind(this._segments, this);
      this._drawWavyLine = __bind(this._drawWavyLine, this);
      this._drawBackground = __bind(this._drawBackground, this);
      this.toSVG = __bind(this.toSVG, this);
      this.width = __bind(this.width, this);
      this.height = __bind(this.height, this);
      this.draw = __bind(this.draw, this);
      this.groupWidth = 65;
      this.numGroups = Math.floor(this.width() / this.groupWidth);
    }

    WavyLines.prototype.draw = function() {
      var i, numberLines, startingX, _i, _ref, _results;
      this._drawBackground();
      _results = [];
      for (i = _i = 0, _ref = this.numGroups; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        startingX = 20 + i * this.groupWidth;
        numberLines = Math.floor(Math.random() * 4 + 20);
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (_j = 0; 0 <= numberLines ? _j <= numberLines : _j >= numberLines; 0 <= numberLines ? _j++ : _j--) {
            _results1.push(this._drawWavyLine(startingX));
          }
          return _results1;
        }).call(this));
      }
      return _results;
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
      var changed, increment, _i, _ref, _results;
      increment = 20;
      changed = false;
      return _.map((function() {
        _results = [];
        for (var _i = 0, _ref = this.height() / increment; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
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

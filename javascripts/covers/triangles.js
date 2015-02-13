(function() {
  var Triangles, cover,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Triangles = (function() {
    function Triangles(_at_canvasID) {
      this.canvasID = _at_canvasID;
      this._randomColor = __bind(this._randomColor, this);
      this._triangle = __bind(this._triangle, this);
      this._drawBackground = __bind(this._drawBackground, this);
      this.toSVG = __bind(this.toSVG, this);
      this.width = __bind(this.width, this);
      this.height = __bind(this.height, this);
      this.draw = __bind(this.draw, this);
      $("#" + this.canvasID).attr("background-color", "rgba(244, 244, 244, 1)");
    }

    Triangles.prototype.draw = function() {
      var columnCount, rowCount, triangle, x, y, _i, _results;
      this._drawBackground();
      columnCount = Math.floor(this.width() / 50) - 1;
      rowCount = Math.floor(this.height() / 80) - 1;
      _results = [];
      for (y = _i = 0; 0 <= rowCount ? _i <= rowCount : _i >= rowCount; y = 0 <= rowCount ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (x = _j = 1; 1 <= columnCount ? _j <= columnCount : _j >= columnCount; x = 1 <= columnCount ? ++_j : --_j) {
            triangle = this._triangle([50 * x, 80 * y + 60]);
            if ((x + y) % 2 === 0) {
              _results1.push(triangle.rotate(180));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Triangles.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    Triangles.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    Triangles.prototype.toSVG = function() {
      return paper.project.exportSVG({
        asString: true
      });
    };

    Triangles.prototype._drawBackground = function() {
      return new Path.Rectangle({
        from: [0, 0],
        to: [this.width(), this.height()],
        fillColor: "rgba(240, 240, 240, 1)"
      });
    };

    Triangles.prototype._triangle = function(pos) {
      var color;
      color = this._randomColor();
      if (Math.random() > 0.4) {
        color = "white";
      }
      return new Path.RegularPolygon({
        center: pos,
        closed: true,
        sides: 3,
        radius: 50,
        fillColor: color
      });
    };

    Triangles.prototype._randomColor = function() {
      var blue, green, red;
      red = Math.random();
      blue = Math.random() / 2;
      green = Math.random() / 4;
      return new Color(red, green, blue, 0.7);
    };

    return Triangles;

  })();

  cover = new Triangles("book_cover");

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

(function() {
  var RailsIosCover, cover,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  RailsIosCover = (function() {
    function RailsIosCover(_at_canvasID) {
      this.canvasID = _at_canvasID;
      this._triangle = __bind(this._triangle, this);
      this.width = __bind(this.width, this);
      this.height = __bind(this.height, this);
      this.draw = __bind(this.draw, this);
      $("#" + this.canvasID).css("background-color", "rgba(255, 255, 255, 1)");
    }

    RailsIosCover.prototype.draw = function() {
      var columnCount, rowCount, triangle, x, y, _i, _results;
      columnCount = Math.floor(this.width() / 50) - 1;
      rowCount = Math.floor(this.height() / 80) - 1;
      _results = [];
      for (y = _i = 0; 0 <= rowCount ? _i <= rowCount : _i >= rowCount; y = 0 <= rowCount ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (x = _j = 1; 1 <= columnCount ? _j <= columnCount : _j >= columnCount; x = 1 <= columnCount ? ++_j : --_j) {
            triangle = this._triangle([50 * x, 80 * y + 50]);
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

    RailsIosCover.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    RailsIosCover.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    RailsIosCover.prototype._triangle = function(pos) {
      var color;
      color = new Color(Math.random(), Math.random() / 4, Math.random() / 2);
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

    return RailsIosCover;

  })();

  cover = new RailsIosCover("book_cover");

  cover.draw();

  $(".canvas-to-svg").click((function(_this) {
    return function(event) {
      var file;
      event.preventDefault();
      file = new CanvasSaver(h);
      return file.save();
    };
  })(this));

}).call(this);

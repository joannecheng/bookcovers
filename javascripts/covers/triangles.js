(function() {
  var Triangles, cover,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Triangles = (function() {
    function Triangles(canvasID) {
      this.canvasID = canvasID;
      this._randomColor = bind(this._randomColor, this);
      this._triangle = bind(this._triangle, this);
      this._drawBackground = bind(this._drawBackground, this);
      this.toSVG = bind(this.toSVG, this);
      this.width = bind(this.width, this);
      this.height = bind(this.height, this);
      this.draw = bind(this.draw, this);
    }

    Triangles.prototype.draw = function() {
      var columnCount, i, ref, results, rowCount, triangle, triangleHeight, triangleWidth, x, y;
      this._drawBackground();
      triangleHeight = 80;
      triangleWidth = 50;
      columnCount = Math.floor(this.width() / triangleWidth) - 1;
      rowCount = Math.floor(this.height() / triangleHeight) - 1;
      results = [];
      for (y = i = 0, ref = rowCount; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
        results.push((function() {
          var j, ref1, results1;
          results1 = [];
          for (x = j = 1, ref1 = columnCount; 1 <= ref1 ? j <= ref1 : j >= ref1; x = 1 <= ref1 ? ++j : --j) {
            triangle = this._triangle([triangleWidth * x, triangleHeight * y + 60]);
            if ((x + y) % 2 === 0) {
              results1.push(triangle.rotate(180));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      }
      return results;
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

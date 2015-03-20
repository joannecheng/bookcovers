(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.CanvasSaver = (function() {
    function CanvasSaver(canvas) {
      this.canvas = canvas;
      this.save = bind(this.save, this);
    }

    CanvasSaver.prototype.save = function() {
      var blob;
      blob = new Blob([this.canvas.toSVG()], {
        type: "image/svg+xml"
      });
      return saveAs(blob, "cover.svg");
    };

    return CanvasSaver;

  })();

}).call(this);

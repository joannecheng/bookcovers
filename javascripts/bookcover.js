(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Bookcover = (function() {
    function Bookcover(_at_canvasID) {
      this.canvasID = _at_canvasID;
      this.draw = __bind(this.draw, this);
      this.width = __bind(this.width, this);
      this.height = __bind(this.height, this);
      this.canvas = new fabric.StaticCanvas(this.canvasID);
    }

    Bookcover.prototype.height = function() {
      return $("#" + this.canvasID).height();
    };

    Bookcover.prototype.width = function() {
      return $("#" + this.canvasID).width();
    };

    Bookcover.prototype.draw = function() {};

    return Bookcover;

  })();

}).call(this);

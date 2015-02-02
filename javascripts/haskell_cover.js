(function() {
  var HaskellCover, h,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  HaskellCover = (function(_super) {
    __extends(HaskellCover, _super);

    function HaskellCover() {
      this.draw = __bind(this.draw, this);
      return HaskellCover.__super__.constructor.apply(this, arguments);
    }

    HaskellCover.prototype.draw = function() {
      return console.log("drawing");
    };

    return HaskellCover;

  })(Bookcover);

  h = new HaskellCover("book_cover");

  h.draw();

}).call(this);

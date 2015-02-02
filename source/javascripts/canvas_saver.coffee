class window.CanvasSaver
  constructor: (@canvas) ->

  save: =>
    blob = new Blob([@canvas.toSVG()], type: "image/svg+xml")
    saveAs(blob, "cover.svg")

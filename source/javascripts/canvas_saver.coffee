class window.CanvasSaver
  constructor: (@canvasSVG) ->

  save: =>
    blob = new Blob([@canvasSVG], type: "image/svg+xml")
    saveAs(blob, "cover.svg")

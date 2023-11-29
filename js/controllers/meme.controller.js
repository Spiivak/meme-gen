'use strict'

function renderCanvas() {
  const canvasContainer = document.querySelector('.canvas-object')
  var StrHTML = '<canvas width="580" height="450"></canvas>'
  canvasContainer.innerHTML = StrHTML
}

function onSelectImg(elImg) {
  gElCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
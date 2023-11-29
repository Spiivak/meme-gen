'use strict'

function renderCanvas() {
  const canvasContainer = document.querySelector('.canvas-object')
  var StrHTML = '<canvas width="580" height="450"></canvas>'
  canvasContainer.innerHTML = StrHTML
}

function onSelectImg(elImg) {
  gElCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  renderMeme()
}

function renderMeme() {
  const meme = getMeme();
  // console.log('meme', meme);

  // Access the selected line directly
  let txt = meme.lines[meme.selectedLineIdx].txt;
  // console.log('txt', txt);

  let fontSize = meme.lines[meme.selectedLineIdx].size;
  let fontColor = meme.lines[meme.selectedLineIdx].color;

  gElCtx.font = `${fontSize}px Arial`

  const textWidth = gElCtx.measureText(txt).width
  const x = (gElCanvas.width - textWidth) / 2

  gElCtx.fillStyle = `${fontColor}`
  gElCtx.fillText(txt, x, 50)
}
'use strict'

let gImg
let gFontSize


function renderCanvas() {
  const canvasContainer = document.querySelector('.canvas-object')
  var StrHTML = '<canvas width="580" height="450"></canvas>'
  canvasContainer.innerHTML = StrHTML
}

function onSelectImg(elImg) {
  if (!elImg) return
  gMeme.selectedImgId = gImgs.id
  gImg = elImg
  renderMeme()
}

function renderMeme() {
  if (!gImg) return

  gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  const meme = getMeme();

  let txt = meme.lines[meme.selectedLineIdx].txt;
  let fontSize = meme.lines[meme.selectedLineIdx].size;
  let fontColor = meme.lines[meme.selectedLineIdx].color;

  gElCtx.font = `${fontSize}px Arial`

  const textWidth = gElCtx.measureText(txt).width
  const x = (gElCanvas.width - textWidth) / 2

  gElCtx.fillStyle = `${fontColor}`
  // gElCtx.clearRect(x, 50 - fontSize, textWidth, fontSize + 5);
  gElCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
  gElCtx.fillText(txt, x, 50)

}

function getTxtInput() {
  const newTxt = document.querySelector('input[type="text"]').value
  setLineText(newTxt)
  renderMeme()
}

function getColorInput() {
  const color = document.querySelector('input[type="color"]').value
  console.log('color', color)
  setColorText(color)
  renderMeme()
}


function getFontSize(){
  const size = document.getElementById('font-size').value
  setFontSize(size)
  renderMeme()
}
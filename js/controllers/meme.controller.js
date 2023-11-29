'use strict'

let gImg
let gFontSize
let isSelected = false

function renderCanvas() {
  const canvasContainer = document.querySelector('.canvas-object')
  var StrHTML = '<canvas width="750" height="565"></canvas>'
  canvasContainer.innerHTML = StrHTML
}

function onSelectImg(elImg) {
  // HIDE
  document.querySelector('.gallery-container').classList.add('hide')
  document.querySelector('.main-side-bar').classList.add('hide')
  // SHOW
  document.querySelector('.canvas-container').classList.remove('hide')

  //  rest of code
  gMeme.selectedImgId = gImgs.id
  gImg = elImg
  renderMeme()
}

function renderMeme() {
  if (!gImg) return

  gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  const meme = getMeme();

  let txt = meme.lines[meme.selectedLineIdx].txt;
  let txt2 = meme.lines[1].txt;
  let fontSize = meme.lines[meme.selectedLineIdx].size;
  let fontColor = meme.lines[meme.selectedLineIdx].color;

  gElCtx.font = `${fontSize}px Arial`

  const textWidth = gElCtx.measureText(txt).width
  const x = (gElCanvas.width - textWidth) / 2

  const textWidth2 = gElCtx.measureText(txt2).width
  const x2 = (gElCanvas.width - textWidth2) / 2
  const textHeight2 = fontSize
  const y2 = gElCanvas.height - textHeight2

  gElCtx.fillStyle = `${fontColor}`
  // gElCtx.clearRect(x, 50 - fontSize, textWidth, fontSize + 5);
  gElCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
  gElCtx.fillText(txt, x, 50)
  gElCtx.fillText(txt2, x2, y2)

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
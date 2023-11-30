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

  let fontSize = meme.lines[meme.selectedLineIdx].size;
  let fontColor = meme.lines[meme.selectedLineIdx].color;

  gElCtx.font = `${fontSize}px Arial`

  const textWidth = gElCtx.measureText(txt).width
  const x = (gElCanvas.width - textWidth) / 2


  gElCtx.fillStyle = `${fontColor}`
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


function onAddText() {
  addLine()
  console.log('hi')
}


function getElImgById(imgId) {
  return document.querySelector(`[src="assets/img/${imgId}.jpg"]`)
}

function getEvPos(ev) {
  var pos = {
     x: ev.offsetX,
     y: ev.offsetY
  }
  if (gTouchEvs.includes(ev.type)) {
     ev.preventDefault()
     var rect = ev.target.getBoundingClientRect()
     var x = ev.targetTouches[0].pageX - rect.left
     var y = ev.targetTouches[0].pageY - rect.top
     pos = { x, y }
  }
  return pos
}


function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = gCanvas.width/gAspectRatio
  setLinesPos(gCanvas.width/2)
  renderMeme()
}
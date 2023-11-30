'use strict'
let gElCanvas
let gElCtx
let gStartPos
const gTouchEvs = ['touchmove', 'tuochend', 'touchstart']
const gStickers = ['💙', '😂', '😎', '😍', '👌🏼', '🤙🏼', '💪🏼', '👄']
let gStickersIdx = 0
let gAspectRatio= 1

function initMeme(imgId) {
  renderCanvas()
  gElCanvas = document.querySelector('canvas')
  // setCanvasHeight(imgId)
  gElCtx = gElCanvas.getContext('2d')
  gElCanvas.width = 750;
  gElCanvas.height = 565;
  addEventListeners()
  // renderStickers()
  setImg(imgId)
  onLoadMeme()
  // resizeCanvas()
  window.addEventListener('resize', () => resizeCanvas())
}

function renderCanvas() {
  const canvasContainer = document.querySelector('.canvas-object')
  var StrHTML = '<canvas width="750" height="565"></canvas>'
  canvasContainer.innerHTML = StrHTML
}


function setCanvasHeight(imgId) {
  const elTestImg = document.querySelector('.test-img')
  elTestImg.style.display = 'inline'
  if (imgId) {
    const imgSrc = getElImgById(imgId).src
    elTestImg.src = imgSrc
  }

  const imgWidth = elTestImg.offsetWidth
  const imgHeight = elTestImg.offsetHeight
  const CanvasHeight = (imgHeight * 500) / imgWidth
  gElCanvas.height = CanvasHeight
  elTestImg.style.display = 'none'
  gAspectRatio = imgWidth / imgHeight
}

function addEventListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const clickedLineIdx = isLineClicked(pos)
  if (clickedLineIdx < 0) {
    switchLine(clickedLineIdx)
    renderMeme()
    return
  }
  switchLine(clickedLineIdx)
  setLineDrag(true)
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
  renderMeme()
}

function onMove(ev) {
  const line = getSelectedLine()
  if (!line || !line.isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  gElCanvas.style.cursor = 'grab'
}

function onLoadMeme() {
  const meme = getMeme()
  const image = new Image()
  image.src = `assets/img/${meme.selectedImgId}.jpg`
  image.onload = () => {
    renderMeme()
  }
}


function renderMeme() {
  const meme = getMeme()
  let elImg = getElImgById(meme.selectedImgId)
  if (!meme.selectedImgId) elImg = document.querySelector('.test-img')
  gElCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  if (meme.lines.length) {
    meme.lines.forEach((line, i) => {
      drawLine(line)
      if (i === meme.selectedLineIdx && meme.selectedLineIdx >= 0) markSelectedLine(meme.lines[meme.selectedLineIdx])
    })
  }
}

function drawLine({ pos: { x, y }, txt, size, fontFam, fillC, strokeC, align }) {
  gElCtx.textBaseline = 'middle'
  gElCtx.textAlign = align
  gElCtx.lineWidth = 1
  gElCtx.strokeStyle = strokeC
  gElCtx.font = `${size}px ${fontFam}`
  gElCtx.fillStyle = fillC
  gElCtx.fillText(txt, x, y)
  gElCtx.strokeText(txt, x, y)
}

function markSelectedLine(line) {
  const { pos: { x, y }, align, size, txt } = line
  const lineHeight = size + 20
  const lineWidth = gElCtx.measureText(txt).width
  gElCtx.beginPath()
  if (align === 'left') {
    gElCtx.rect(x, y - (lineHeight / 2), lineWidth, lineHeight)
  } else if (align === 'center') {
    gElCtx.rect(x - (lineWidth / 2), y - (lineHeight / 2), lineWidth, lineHeight)
  } else if (align === 'right') {
    gElCtx.rect(x - lineWidth, y - (lineHeight / 2), lineWidth, lineHeight)
  }
  gElCtx.lineWidth = 2
  gElCtx.strokeStyle = 'rgb(15,155,180)'
  gElCtx.stroke()
  gElCtx.closePath()
  renderLineValues(line)
}

function renderLineValues(line) {
  const propsToIgnore = ['size', 'align', 'pos', 'isDrag']
  console.log(line)
  Object.keys(line).forEach((prop) => {
    if (!propsToIgnore.includes(prop)) {
      console.log(prop)
      //  document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop]
    }
  })
}

function onSetText(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onSetColor(color, part) {
  setColor(color, part)
  renderMeme()
}

function getFontSize() {
  const size = document.getElementById('font-size').value
  setFontSize(size)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  renderMeme()
  document.querySelector('input[name="txt"]').focus()
}

function onSetFontFam(fontFam) {
  setFontFam(fontFam)
  renderMeme()
}

function onSetAlign(align) {
  setAlign(align)
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

// function renderStickers() {
//   let strHTMLs = ''
//   for (var i = gStickersIdx i < gStickersIdx + 4 i++) {
//      strHTMLs += `<button class="sticker" onclick="onStickerClick('${gStickers[i]}')">${gStickers[i]}</button>`
//   }
//   document.querySelector('.stickers-display').innerHTML = strHTMLs
// }

// function onScrollStickers(diff) {
//   const stickersIdx = gStickersIdx + diff
//   if (stickersIdx < 0) gStickersIdx = gStickers.length - 4
//   else if (stickersIdx > (gStickers.length - 4)) gStickersIdx = 0
//   else gStickersIdx = stickersIdx
//   renderStickers()
// }

// function onStickerClick(sticker) {
//   addLine(sticker)
//   renderMeme()
// }

function onDownloadMeme(elLink) {
  switchLine(-1)
  renderMeme()
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-meme.jpg'
}

function onUploadMeme() {
  switchLine(-1)
  renderMeme()
  uploadMeme()
}

function onSaveMeme() {
  switchLine(-1)
  renderMeme()
  const MemeData = gElCanvas.toDataURL()
  saveMeme(MemeData)
  navigateTo('saved')
  renderSaved()
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
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = gElCanvas.width/gAspectRatio
  setLinesPos(gElCanvas.width/2)
  renderMeme()
}





































// function onSelectImg(imgId) {
//   // HIDE
//   document.querySelector('.gallery-container').classList.add('hide')
//   document.querySelector('.main-side-bar').classList.add('hide')
//   // SHOW
//   document.querySelector('.canvas-container').classList.remove('hide')

//   //  rest of code
//   gMeme.selectedImgId = imgId
//   renderMeme()
// }

function goBack() {
  // flashMsg('Are you sure?')

  // Remove Hide
  document.querySelector('.main-side-bar').classList.remove('hide')
  document.querySelector('.gallery-container').classList.remove('hide')

  // Add Hide
  document.querySelector('.canvas-container').classList.add('hide')
}
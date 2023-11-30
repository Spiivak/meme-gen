'use strict'

const STORAGE_MEMES = 'MemesDB'

let isSecLine = true
let gMemesDBs

let gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [{
    txt: 'Insert Your text here...',
    size: 40,
    align: 'center',
    pos: {
      x: 250,
      y: 50
    },
    fontFam: 'impact',
    fillC: '#ffffff',
    strokeC: '#000000',
    isDrag: false
  }]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
  return gMeme
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  if (gMeme.selectedLineIdx < 0) return;
  getSelectedLine().txt = txt;
}


function setColorText(color, part) {
  if (gMeme.selectedLineIdx < 0) return
  getSelectedLine()[part] = color
}
function setFontSize(size) {
  if (gMeme.selectedLineIdx < 0) return
  gMeme.lines[gMeme.selectedLineIdx].size = size
}

function switchLine(lineIdx) {
  if (lineIdx || lineIdx === 0) gMeme.selectedLineIdx = lineIdx
  else gMeme.selectedLineIdx = (gMeme.selectedLineIdx === (gMeme.lines.length - 1)) ? 0 : gMeme.selectedLineIdx + 1
}

function setFontFam(fontFam) {
  if (gMeme.selectedLineIdx < 0) return
  getSelectedLine().fontFam = fontFam
}

function setAlign(align) {
  if (gMeme.selectedLineIdx < 0) return
  getSelectedLine().align = align
  let x;
  if (align === 'start') x = 10
  else if (align === 'center') x = gCanvas.width / 2
  else if (align === 'end') x = gCanvas.width - 10
  getSelectedLine().pos.x = x
}


function addLine(txt = '*meme text*') {
  const line = {
    txt,
    size: 40,
    align: 'center',
    pos: {
      x: gCanvas.width / 2,
      y: gCanvas.height / 2
    },
    fontFam: 'impact',
    fillC: '#ffffff',
    strokeC: '#000000',
    isDrag: false
  }
  if (isSecLine) line.pos.y = gCanvas.height - 50
  isSecLine = false
  gMeme.lines.push(line)
  switchLine(gMeme.lines.length - 1)
}

function deleteLine() {
  if (gMeme.selectedLineIdx < 0) return
  if (!getSelectedLine()) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  if (!gMeme.lines.length) gMeme.selectedLineIdx = - 1
}

function isLineClicked(pos) {
  return gMeme.lines.findIndex(line => {
    const x = line.pos.x
    const y = line.pos.y
    const lineHeight = line.size + 20
    const lineWidth = gCtx.measureText(line.txt).width
    if (line.align === 'start') {
      return (pos.x > x &&
        pos.y > (y - (lineHeight / 2)) &&
        pos.x < x + lineWidth &&
        pos.y < (y - (lineHeight / 2)) + lineHeight)
    } else if (line.align === 'center') {
      return (pos.x > x - (lineWidth / 2) &&
        pos.y > (y - (lineHeight / 2)) &&
        pos.x < x - (lineWidth / 2) + lineWidth &&
        pos.y < (y - (lineHeight / 2)) + lineHeight)
    } else if (line.align === 'end') {
      return (pos.x > x - lineWidth &&
        pos.y > y - (lineHeight / 2) &&
        pos.x < x + lineWidth &&
        pos.y < (y - (lineHeight / 2)) + lineHeight)
    }
  })
}

function setLineDrag(isDrag) {
  if (gMeme.selectedLineIdx < 0) return;
  getSelectedLine().isDrag = isDrag;
}

function moveLine(dx, dy) {
  getSelectedLine().pos.x += dx;
  getSelectedLine().pos.y += dy;
}

function loadMemes() {
  gMemesDBs = loadFromStorage(STORAGE_MEMES);
  if (!gMemesDBs) gMemesDBs = [];
}

function saveMeme(MemeData) {
  gMemesDBs.push(MemeData);
  saveToStorage(STORAGE_MEMES, gMemeDBs);
}

function getMemesDATAs() {
  return gMemesDBs;
}

function resetMeme() {
  gMeme = {
     selectedImgId: 0,
     selectedLineIdx: -1,
     lines: []
  }
}

function deleteMeme(savedIdx) {
  gMemesDATAs.splice(savedIdx, 1);
  saveToStorage(STORAGE_MEMES, gMemesDBs)
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setLinesPos(centerX){
  gMeme.lines.forEach(line => line.pos.x=centerX)
}
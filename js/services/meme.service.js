'use strict'

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
  {
  txt: 'First Line',
  size: 20,
  color: 'red'
  },
  {
    txt: 'Second Line',
    size: 20,
    color: 'red'
    }
  ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme() {
  return gMeme
}

function setLineText(newTxt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function setColorText(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(size) {
  gMeme.lines[gMeme.selectedLineIdx].size = size
}